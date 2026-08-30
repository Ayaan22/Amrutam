import React, { memo } from 'react';
import { ScrollView, Pressable, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { HealthRecordType } from '../../types';
import { TypeFilterBarProps } from './TypeFilterBar.types';
import { createStyles } from './TypeFilterBar.styles';

interface FilterOption {
  key: HealthRecordType | 'ALL';
  label: string;
  icon: string;
}

export const TypeFilterBar: React.FC<TypeFilterBarProps> = memo(
  ({ selectedType, onSelectType }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    const filterOptions: FilterOption[] = [
      {
        key: 'ALL',
        label: STRINGS.healthRecords.types.all,
        icon: 'view-grid-outline',
      },
      {
        key: 'Lab Report',
        label: STRINGS.healthRecords.types.labReport,
        icon: 'test-tube',
      },
      {
        key: 'Prescription',
        label: STRINGS.healthRecords.types.prescription,
        icon: 'pill',
      },
      {
        key: 'Consultation',
        label: STRINGS.healthRecords.types.consultation,
        icon: 'doctor',
      },
      {
        key: 'Vaccination',
        label: STRINGS.healthRecords.types.vaccination,
        icon: 'needle',
      },
      {
        key: 'Allergy',
        label: STRINGS.healthRecords.types.allergy,
        icon: 'shield-alert-outline',
      },
    ];

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filterOptions.map((item) => {
            const isSelected = selectedType === item.key;
            return (
              <Pressable
                key={item.key}
                onPress={() => onSelectType(item.key)}
                style={[
                  styles.chip,
                  isSelected && styles.chipActive,
                ]}
                accessibilityRole="button"
                accessibilityLabel={item.label}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={15}
                  color={
                    isSelected
                      ? theme.colors.primary
                      : theme.colors.textMuted
                  }
                />
                <Text
                  style={[
                    styles.chipText,
                    isSelected && styles.chipTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  }
);

TypeFilterBar.displayName = 'TypeFilterBar';
export default TypeFilterBar;
