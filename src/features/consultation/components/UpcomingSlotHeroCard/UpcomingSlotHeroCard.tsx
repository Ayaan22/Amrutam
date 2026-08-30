import React, { memo } from 'react';
import { View, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Text, Badge, Button, Image } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { createStyles } from './UpcomingSlotHeroCard.styles';
import { UpcomingSlotHeroCardProps } from './UpcomingSlotHeroCard.types';

export const UpcomingSlotHeroCard: React.FC<UpcomingSlotHeroCardProps> = memo(({
  booking,
  onJoinCall,
  onCancelBooking,
  onDoctorPress,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { doctor, slot, formattedDate } = booking;

  return (
    <Card variant="elevated" style={styles.card}>
      {/* Top Status */}
      <View style={styles.statusBadgeRow}>
        <Badge
          label={STRINGS.consultation.upcomingSlot.statusBadge}
          variant="primary"
        />
        <View style={styles.livePill}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>
            {STRINGS.consultation.bookingSuccess.confirmedStatus}
          </Text>
        </View>
      </View>

      {/* Scheduled Time Banner */}
      <View style={styles.timeBanner}>
        <View style={styles.timeCol}>
          <Text variant="caption" color="primary">
            {STRINGS.consultation.bookingSuccess.scheduledTime}
          </Text>
          <Text variant="h2" color="primary" style={styles.timeValue}>
            {slot.time}
          </Text>
        </View>
        <View style={styles.datePill}>
          <Text variant="caption" color="secondary">
            {STRINGS.consultation.bookingSuccess.scheduledDate}
          </Text>
          <Text variant="body" color="primary" style={styles.dateValue}>
            {formattedDate}
          </Text>
        </View>
      </View>

      {/* Doctor Summary Info */}
      <Pressable
        onPress={onDoctorPress}
        accessibilityRole="button"
        accessibilityLabel={`${STRINGS.consultation.upcomingSlot.doctorDetailsCta} ${doctor.name}`}
        style={styles.doctorRow}
      >
        <Image
          uri={doctor.avatarUrl}
          priority="high"
          style={styles.avatar}
          borderRadius={theme.radius.md}
        />
        <View style={styles.doctorInfo}>
          <Text variant="h3" color="primary" style={styles.doctorName}>
            {doctor.name}
          </Text>
          <Text variant="caption" color="secondary">
            {doctor.degree} • {doctor.experienceYears} {STRINGS.common.yearsExp}
          </Text>
          <View style={styles.ratingRow}>
            <Text variant="caption" style={styles.ratingStar}>
              {STRINGS.common.ratingStar}
            </Text>
            <Text variant="caption" color="primary">
              {doctor.rating.toFixed(1)} ({doctor.reviewCount})
            </Text>
          </View>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color={theme.colors.primary}
        />
      </Pressable>

      {/* Mode & Fee Row */}
      <View style={styles.modeFeeRow}>
        <View style={styles.modeTag}>
          <MaterialCommunityIcons
            name="video"
            size={16}
            color={theme.colors.primary}
          />
          <Text variant="caption" color="primary" style={styles.modeText}>
            {STRINGS.consultation.bookingSuccess.modeValue}
          </Text>
        </View>
        <Text variant="bodySmall" color="secondary">
          {STRINGS.consultation.feeLabel}:{' '}
          <Text variant="bodySmall" color="primary" style={styles.feeText}>
            {STRINGS.common.currencySymbol}{doctor.consultationFee}
          </Text>{' '}
          (Paid)
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <Button
          title={STRINGS.consultation.upcomingSlot.joinCallCta}
          variant="primary"
          size="large"
          onPress={onJoinCall}
          style={styles.joinButton}
        />

        <Button
          variant="ghost"
          size="medium"
          onPress={onCancelBooking}
          accessibilityLabel={STRINGS.consultation.upcomingSlot.cancelBookingCta}
          style={styles.cancelButton}
        >
          <MaterialCommunityIcons
            name="calendar-remove"
            size={18}
            color={theme.colors.error}
          />
          <Text variant="bodySmall" color="error" style={styles.cancelButtonText}>
            {STRINGS.consultation.upcomingSlot.cancelBookingCta}
          </Text>
        </Button>
      </View>
    </Card>
  );
});

UpcomingSlotHeroCard.displayName = 'UpcomingSlotHeroCard';
export default UpcomingSlotHeroCard;
