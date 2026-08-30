import React, { memo } from 'react';
import { View, Pressable } from 'react-native';
import { Text, Badge } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { createStyles } from './DoctorSlotsGrid.styles';
import { DoctorSlotsGridProps } from './DoctorSlotsGrid.types';

export const DoctorSlotsGrid: React.FC<DoctorSlotsGridProps> = memo(
  ({ slots, selectedSlot, todayFormatted, isSlotBooked, onSelectSlot }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
      <View style={styles.section}>
        <View style={styles.slotsHeaderRow}>
          <Text variant="h3" color="primary" style={styles.sectionTitle}>
            {STRINGS.consultation.doctorDetails.todaySlotsSection}
          </Text>
          <Badge label={todayFormatted} variant="primary" />
        </View>

        <View style={styles.slotsGrid}>
          {slots.map(slot => {
            const isBooked = isSlotBooked(slot.id, slot.time);
            const isExpired = slot.isExpired;
            const isUnavailable = isExpired || isBooked;
            const isSelected = selectedSlot?.id === slot.id && !isUnavailable;

            return (
              <Pressable
                key={slot.id}
                onPress={() => onSelectSlot(slot)}
                disabled={isUnavailable}
                accessibilityRole="button"
                accessibilityLabel={`${slot.time} ${
                  isBooked
                    ? 'booked'
                    : isExpired
                    ? 'expired'
                    : isSelected
                    ? 'selected'
                    : 'available'
                }`}
                style={[
                  styles.slotPill,
                  isBooked
                    ? styles.slotPillBooked
                    : isExpired
                    ? styles.slotPillExpired
                    : isSelected
                    ? styles.slotPillSelected
                    : styles.slotPillAvailable,
                ]}
              >
                <Text
                  variant="bodySmall"
                  style={[
                    styles.slotTimeText,
                    isUnavailable
                      ? styles.slotTimeTextUnavailable
                      : isSelected
                      ? styles.slotTimeTextSelected
                      : styles.slotTimeTextAvailable,
                  ]}
                >
                  {slot.time}
                </Text>

                {isBooked ? (
                  <Text variant="caption" style={styles.badgeTextBooked}>
                    {STRINGS.consultation.doctorDetails.slotBookedBadge}
                  </Text>
                ) : isExpired ? (
                  <Text variant="caption" style={styles.badgeTextExpired}>
                    {STRINGS.consultation.doctorDetails.slotExpiredBadge}
                  </Text>
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  },
);

DoctorSlotsGrid.displayName = 'DoctorSlotsGrid';
export default DoctorSlotsGrid;
