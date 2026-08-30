import React, { memo } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from '@core-components';
import { useTheme } from '@theme';
import { HealthRecordType } from '../../types';
import { RecordHeaderProps } from './RecordHeader.types';
import { createStyles } from './RecordHeader.styles';

export const RecordHeader: React.FC<RecordHeaderProps> = memo(({ type, date }) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const getTypeMeta = (recordType: HealthRecordType) => {
    switch (recordType) {
      case 'Lab Report':
        return { color: theme.colors.recordLab, icon: 'test-tube' };
      case 'Prescription':
        return { color: theme.colors.recordPrescription, icon: 'pill' };
      case 'Consultation':
        return { color: theme.colors.recordConsultation, icon: 'doctor' };
      case 'Vaccination':
        return { color: theme.colors.recordVaccination, icon: 'needle' };
      case 'Allergy':
        return { color: theme.colors.recordAllergy, icon: 'shield-alert-outline' };
    }
  };

  const { color, icon } = getTypeMeta(type);

  const formattedDate = () => {
    try {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return date;
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.typeBadge, { backgroundColor: `${color}18` }]}>
        <MaterialCommunityIcons name={icon} size={12} color={color} />
        <Text style={[styles.typeBadgeText, { color }]}>{type}</Text>
      </View>
      <Text style={styles.dateText}>{formattedDate()}</Text>
    </View>
  );
});

RecordHeader.displayName = 'RecordHeader';
export default RecordHeader;
