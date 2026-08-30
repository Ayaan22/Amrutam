import React, { memo } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Text } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { createStyles } from './PreConsultationGuidelines.styles';

export const PreConsultationGuidelines: React.FC = memo(() => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const guidelines = [
    STRINGS.consultation.upcomingSlot.instruction1,
    STRINGS.consultation.upcomingSlot.instruction2,
    STRINGS.consultation.upcomingSlot.instruction3,
  ];

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <MaterialCommunityIcons
          name="information-outline"
          size={18}
          color={theme.colors.primary}
        />
        <Text variant="h3" color="primary" style={styles.title}>
          {STRINGS.consultation.upcomingSlot.instructionsTitle}
        </Text>
      </View>

      <Card variant="outlined" style={styles.card}>
        <View style={styles.list}>
          {guidelines.map((instruction, index) => (
            <View key={index} style={styles.itemRow}>
              <MaterialCommunityIcons
                name="check-circle"
                size={16}
                color={theme.colors.success}
              />
              <Text variant="caption" color="secondary" style={styles.itemText}>
                {instruction}
              </Text>
            </View>
          ))}
        </View>
      </Card>
    </View>
  );
});

PreConsultationGuidelines.displayName = 'PreConsultationGuidelines';
export default PreConsultationGuidelines;
