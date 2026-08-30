import React, { memo } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@theme';
import { HealthRecordType } from '../../types';
import { TimelineNodeProps } from './TimelineNode.types';
import { createStyles } from './TimelineNode.styles';

export const TimelineNode: React.FC<TimelineNodeProps> = memo(
  ({ type, isLast = false }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    const getNodeMeta = (recordType: HealthRecordType) => {
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

    const { color, icon } = getNodeMeta(type);

    return (
      <View style={styles.container}>
        <View style={[styles.node, { backgroundColor: color }]}>
          <MaterialCommunityIcons name={icon} size={15} color={theme.colors.textInverse} />
        </View>
        {!isLast && <View style={styles.connectingLine} />}
      </View>
    );
  }
);

TimelineNode.displayName = 'TimelineNode';
export default TimelineNode;
