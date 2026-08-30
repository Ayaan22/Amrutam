import React, { memo } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { MonthSectionHeaderProps } from './MonthSectionHeader.types';
import { createStyles } from './MonthSectionHeader.styles';

export const MonthSectionHeader: React.FC<MonthSectionHeaderProps> = memo(
  ({ monthYear, count }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
      <View style={styles.container}>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={14}
            color={theme.colors.primary}
          />
        </View>
        <Text style={styles.title}>{monthYear}</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {STRINGS.healthRecords.recordsCount(count)}
          </Text>
        </View>
      </View>
    );
  }
);

MonthSectionHeader.displayName = 'MonthSectionHeader';
export default MonthSectionHeader;
