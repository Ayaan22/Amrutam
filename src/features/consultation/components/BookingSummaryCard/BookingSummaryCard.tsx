import React, { memo } from 'react';
import { View, Animated } from 'react-native';
import { Card, Text, Badge, Image } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { createStyles } from './BookingSummaryCard.styles';
import { BookingSummaryCardProps } from './BookingSummaryCard.types';

export const BookingSummaryCard: React.FC<BookingSummaryCardProps> = memo(({
  booking,
  fadeAnim,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { doctor, slot, formattedDate, id } = booking;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Card variant="elevated" style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text variant="caption" color="muted">
            {STRINGS.consultation.bookingSuccess.bookingIdLabel}
          </Text>
          <Badge label={id} variant="primary" />
        </View>

        {/* Doctor Info */}
        <View style={styles.doctorRow}>
          <Image
            uri={doctor.avatarUrl}
            priority="high"
            style={styles.avatar}
            borderRadius={theme.radius.md}
          />
          <View style={styles.doctorInfo}>
            <Text variant="caption" color="muted">
              {STRINGS.consultation.bookingSuccess.consultingVaidya}
            </Text>
            <Text variant="h3" color="primary" style={styles.doctorName}>
              {doctor.name}
            </Text>
            <Text variant="caption" color="secondary">
              {doctor.degree}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Date Row */}
        <View style={styles.detailRow}>
          <Text variant="body" color="secondary">
            {STRINGS.consultation.bookingSuccess.scheduledDate}
          </Text>
          <Text variant="body" color="primary" style={styles.detailValue}>
            {formattedDate}
          </Text>
        </View>

        {/* Time Row */}
        <View style={styles.detailRow}>
          <Text variant="body" color="secondary">
            {STRINGS.consultation.bookingSuccess.scheduledTime}
          </Text>
          <Text variant="h3" color="primary" style={styles.detailValue}>
            {slot.time}
          </Text>
        </View>

        {/* Mode Row */}
        <View style={styles.detailRow}>
          <Text variant="body" color="secondary">
            {STRINGS.consultation.bookingSuccess.consultationMode}
          </Text>
          <Text variant="body" color="primary" style={styles.detailValue}>
            {STRINGS.consultation.bookingSuccess.modeValue}
          </Text>
        </View>

        {/* Fee Row */}
        <View style={styles.detailRow}>
          <Text variant="body" color="secondary">
            {STRINGS.consultation.feeLabel}
          </Text>
          <Text variant="body" color="primary" style={styles.detailValue}>
            {STRINGS.common.currencySymbol}{doctor.consultationFee} (Paid)
          </Text>
        </View>
      </Card>
    </Animated.View>
  );
});

BookingSummaryCard.displayName = 'BookingSummaryCard';
export default BookingSummaryCard;
