import React, { useState, useMemo, useCallback } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { Surface, Text, SearchBar, Badge, EmptyState } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS, MOCK_DOCTORS } from '@utils';
import { useAppStore } from '@store';
import { Doctor } from '@features/consultation/types';
import { DoctorCard, UpcomingConsultationBanner } from '@features/consultation/components';
import { AppStackParamList } from '@app/navigation/types';
import { createStyles } from './DoctorListings.styles';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const SPECIALTIES = [
  STRINGS.consultation.specialties.all,
  STRINGS.consultation.specialties.panchakarma,
  STRINGS.consultation.specialties.digestiveHealth,
  STRINGS.consultation.specialties.skinAndHair,
  STRINGS.consultation.specialties.kayachikitsa,
  STRINGS.consultation.specialties.womensHealth,
  STRINGS.consultation.specialties.nadiPariksha,
];

export const DoctorListings: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp>();
  const activeBooking = useAppStore((state) => state.activeBooking);

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>(
    STRINGS.consultation.specialties.all
  );

  const filteredDoctors = useMemo(() => {
    return MOCK_DOCTORS.filter((doctor) => {
      const matchesSpecialty =
        selectedSpecialty === STRINGS.consultation.specialties.all ||
        doctor.specialties.some((s) =>
          s.toLowerCase().includes(selectedSpecialty.toLowerCase())
        );

      return matchesSpecialty;
    });
  }, [selectedSpecialty]);

  const handleSearchPress = () => {
    navigation.navigate(STRINGS.navigation.routes.search, undefined);
  };

  const handleDoctorPress = useCallback(
    (doctor: Doctor) => {
      navigation.navigate(STRINGS.navigation.routes.doctorDetails, { doctor });
    },
    [navigation]
  );

  const handleBannerPress = () => {
    if (activeBooking) {
      navigation.navigate(STRINGS.navigation.routes.upcomingSlot, {
        bookingId: activeBooking.id,
      });
    }
  };

  const renderDoctorItem = useCallback(
    ({ item }: { item: Doctor }) => (
      <DoctorCard
        doctor={item}
        onPress={handleDoctorPress}
      />
    ),
    [handleDoctorPress]
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.titleSection}>
        <Text variant="h1" color="primary">
          {STRINGS.consultation.title}
        </Text>
        <Text variant="body" color="secondary" style={styles.subtitle}>
          {STRINGS.consultation.subtitle}
        </Text>
      </View>

      {/* Active Upcoming Booking Banner */}
      {activeBooking ? (
        <UpcomingConsultationBanner
          booking={activeBooking}
          onPress={handleBannerPress}
        />
      ) : null}

      <SearchBar
        placeholder={STRINGS.consultation.searchPlaceholder}
        onPress={handleSearchPress}
        style={styles.searchBar}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {SPECIALTIES.map((spec) => {
          const isSelected = selectedSpecialty === spec;
          return (
            <Pressable
              key={spec}
              onPress={() => setSelectedSpecialty(spec)}
              accessibilityRole="button"
              accessibilityLabel={`${STRINGS.common.filter} ${spec}`}
            >
              <Badge
                label={spec}
                variant={isSelected ? 'primary' : 'warning'}
                style={isSelected ? styles.selectedChip : styles.chip}
              />
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.countRow}>
        <Text variant="label" color="secondary">
          {STRINGS.consultation.doctorsCountLabel(filteredDoctors.length)}
        </Text>
      </View>
    </View>
  );

  const renderEmptyComponent = () => (
    <EmptyState
      title={STRINGS.consultation.emptyState.title}
      description={STRINGS.consultation.emptyState.description}
      actionLabel={STRINGS.consultation.emptyState.resetAction}
      onActionPress={() => {
        setSelectedSpecialty(STRINGS.consultation.specialties.all);
      }}
    />
  );

  return (
    <Surface style={styles.container}>
      <FlashList
        data={filteredDoctors}
        renderItem={renderDoctorItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
      />
    </Surface>
  );
};

export default DoctorListings;
