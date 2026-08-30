import React, { memo } from 'react';
import { View, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { createStyles } from './UpcomingConsultationBanner.styles';
import { UpcomingConsultationBannerProps } from './UpcomingConsultationBanner.types';

export const UpcomingConsultationBanner: React.FC<UpcomingConsultationBannerProps> =
  memo(({ booking, onPress }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={STRINGS.consultation.upcomingSlot.statusBadge}
        style={({ pressed }) => [
          styles.upcomingBanner,
          pressed && styles.upcomingBannerPressed,
        ]}
      >
        <View style={styles.upcomingBannerLeft}>
          <View style={styles.upcomingIconCircle}>
            <MaterialCommunityIcons
              name="calendar-check"
              size={18}
              color={theme.colors.textInverse}
            />
          </View>
          <View style={styles.upcomingBannerText}>
            <Text
              variant="bodySmall"
              color="primary"
              style={styles.upcomingBannerTitle}
            >
              {STRINGS.consultation.upcomingSlot.statusBadge}
            </Text>
            <Text variant="caption" color="secondary" numberOfLines={1}>
              With {booking.doctor.name} at {booking.slot.time}
            </Text>
          </View>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={theme.colors.primary}
        />
      </Pressable>
    );
  });

UpcomingConsultationBanner.displayName = 'UpcomingConsultationBanner';
export default UpcomingConsultationBanner;
