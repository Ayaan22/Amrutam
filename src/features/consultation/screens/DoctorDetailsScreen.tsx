import React, { useState, useMemo, useCallback } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Surface, Text, Card, Badge, Button, Image } from '@core-components';
import { useTheme } from '@theme';
import {
  STRINGS,
  getTodaySlots,
  getTodayFormattedDate,
  TimeSlot,
} from '@utils';
import { useAppStore, useNetworkStore } from '@store';
import { enqueueOfflineBooking } from '../../../services/offlineSync';
import { Booking } from '@features/consultation/types';
import { DoctorSlotsGrid } from '@features/consultation/components';
import { AppStackParamList } from '@app/navigation/types';
import { createStyles } from './DoctorDetailsScreen.styles';

type DoctorDetailsRouteProp = RouteProp<AppStackParamList, 'DoctorDetails'>;
type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

export const DoctorDetailsScreen: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DoctorDetailsRouteProp>();

  const setBooking = useAppStore((state) => state.setBooking);
  const bookings = useAppStore((state) => state.bookings);

  const doctor = route.params.doctor;
  const todayFormatted = useMemo(() => getTodayFormattedDate(), []);
  const todaySlots = useMemo(() => getTodaySlots(), []);

  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Checks if this doctor's slot is already booked (Double Booking prevention)
  const isSlotBooked = useCallback(
    (slotId: string, slotTime: string) => {
      return bookings.some(
        (b) =>
          b.doctor.id === doctor.id &&
          (b.slot.id === slotId || b.slot.time === slotTime) &&
          b.status !== 'cancelled'
      );
    },
    [bookings, doctor.id]
  );

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.isExpired || isSlotBooked(slot.id, slot.time)) {
      return;
    }
    setSelectedSlot(slot);
  };

  const handleBookNow = () => {
    // 1. Mandatory slot selection check
    if (!selectedSlot) {
      Alert.alert(
        STRINGS.common.appName,
        STRINGS.consultation.doctorDetails.slotMandatoryError,
        [{ text: STRINGS.common.ok }]
      );
      return;
    }

    // 2. Expired slot check (real-time validation at confirmation time)
    const now = new Date();
    const isNowExpired =
      selectedSlot.hour < now.getHours() ||
      (selectedSlot.hour === now.getHours() && selectedSlot.minute <= now.getMinutes());

    if (isNowExpired) {
      Alert.alert(
        STRINGS.common.appName,
        STRINGS.consultation.doctorDetails.slotExpiredError,
        [{ text: STRINGS.common.ok }]
      );
      setSelectedSlot(null);
      return;
    }

    // 3. Double booking attempt check (same doctor & same slot)
    if (isSlotBooked(selectedSlot.id, selectedSlot.time)) {
      Alert.alert(
        STRINGS.common.appName,
        STRINGS.consultation.doctorDetails.doubleBookingError,
        [{ text: STRINGS.common.ok }]
      );
      setSelectedSlot(null);
      return;
    }

    // 4. Slot conflict check (cross-doctor time collision for patient)
    const conflictingBooking = bookings.find(
      (b) =>
        b.doctor.id !== doctor.id &&
        b.slot.time === selectedSlot.time &&
        b.status !== 'cancelled'
    );

    if (conflictingBooking) {
      Alert.alert(
        STRINGS.common.appName,
        STRINGS.consultation.doctorDetails.slotConflictError(
          conflictingBooking.doctor.name,
          selectedSlot.time
        ),
        [{ text: STRINGS.common.ok }]
      );
      return;
    }

    // All validations passed -> create booking
    const isOnline = useNetworkStore.getState().isOnline;
    const newBooking: Booking = {
      id: `amr_${Date.now()}`,
      doctor,
      slot: selectedSlot,
      formattedDate: todayFormatted,
      bookingCreatedAt: new Date().toISOString(),
      status: 'confirmed',
      consultationFee: doctor.consultationFee,
      mode: 'video',
      isOfflineQueued: !isOnline,
    };

    setBooking(newBooking);

    if (!isOnline) {
      enqueueOfflineBooking(newBooking);
      useNetworkStore.getState().updatePendingCount();
    }

    navigation.navigate(STRINGS.navigation.routes.bookingSuccess, {
      booking: newBooking,
    });
  };

  return (
    <Surface style={styles.container}>
      {/* Top Navigation Header with core Button */}
      <View style={styles.header}>
        <Button
          variant="ghost"
          size="small"
          onPress={() => navigation.goBack()}
          accessibilityLabel={STRINGS.common.back}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={theme.colors.textPrimary}
          />
        </Button>
        <Text variant="h3" color="primary" style={styles.headerTitle}>
          {STRINGS.consultation.doctorDetails.headerTitle}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Doctor Summary Hero Card */}
        <Card variant="elevated" style={styles.profileCard}>
          <View style={styles.profileRow}>
            <Image
              uri={doctor.avatarUrl}
              priority="high"
              style={styles.avatar}
              borderRadius={theme.radius.md}
            />
            <View style={styles.profileInfo}>
              <Text variant="h2" color="primary" style={styles.doctorName}>
                {doctor.name}
              </Text>
              <Text variant="bodySmall" color="secondary" style={styles.degreeText}>
                {doctor.degree}
              </Text>
              <View style={styles.ratingRow}>
                <Text variant="caption" style={styles.ratingStar}>
                  {STRINGS.common.ratingStar}
                </Text>
                <Text variant="bodySmall" color="primary" style={styles.ratingScore}>
                  {doctor.rating.toFixed(1)}
                </Text>
                <Text variant="caption" color="muted">
                  ({doctor.reviewCount} Reviews)
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Quick Stats Grid */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="caption" color="muted">
                {STRINGS.consultation.doctorDetails.experienceSection}
              </Text>
              <Text variant="body" color="primary" style={styles.statValue}>
                {doctor.experienceYears} {STRINGS.common.yearsExp}
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text variant="caption" color="muted">
                {STRINGS.consultation.feeLabel}
              </Text>
              <Text variant="body" color="primary" style={styles.statValue}>
                {STRINGS.common.currencySymbol}{doctor.consultationFee}
              </Text>
            </View>
          </View>
        </Card>

        {/* About Section */}
        <View style={styles.section}>
          <Text variant="h3" color="primary" style={styles.sectionTitle}>
            {STRINGS.consultation.doctorDetails.aboutSection}
          </Text>
          <Text variant="body" color="secondary" style={styles.aboutText}>
            {doctor.about}
          </Text>
        </View>

        {/* Specialties */}
        <View style={styles.section}>
          <Text variant="h3" color="primary" style={styles.sectionTitle}>
            {STRINGS.consultation.doctorDetails.specialtiesSection}
          </Text>
          <View style={styles.chipsWrap}>
            {doctor.specialties.map((spec) => (
              <Badge key={spec} label={spec} variant="primary" />
            ))}
          </View>
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text variant="h3" color="primary" style={styles.sectionTitle}>
            {STRINGS.consultation.doctorDetails.languagesSection}
          </Text>
          <View style={styles.chipsWrap}>
            {doctor.languages.map((lang) => (
              <Badge key={lang} label={lang} variant="warning" />
            ))}
          </View>
        </View>

        {/* Modular DoctorSlotsGrid Component */}
        <DoctorSlotsGrid
          slots={todaySlots}
          selectedSlot={selectedSlot}
          todayFormatted={todayFormatted}
          isSlotBooked={isSlotBooked}
          onSelectSlot={handleSlotSelect}
        />
      </ScrollView>

      {/* Bottom Sticky Booking Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.feeBlock}>
          <Text variant="caption" color="muted">
            {STRINGS.consultation.feeLabel}
          </Text>
          <Text variant="h2" color="primary" style={styles.feeValue}>
            {STRINGS.common.currencySymbol}{doctor.consultationFee}
          </Text>
        </View>

        <Button
          title={
            selectedSlot
              ? `${STRINGS.consultation.doctorDetails.bookNowCta} • ${selectedSlot.time}`
              : STRINGS.consultation.doctorDetails.bookNowCta
          }
          variant="primary"
          size="large"
          onPress={handleBookNow}
          style={styles.bookButton}
        />
      </View>
    </Surface>
  );
};

export default DoctorDetailsScreen;
