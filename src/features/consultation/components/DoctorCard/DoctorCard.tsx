import React, { memo } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Text, Badge, Image, Button } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { DoctorCardProps } from './DoctorCard.types';
import { createStyles } from './DoctorCard.styles';

export const DoctorCard: React.FC<DoctorCardProps> = memo(({
  doctor,
  onPress,
  testID,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const handlePress = () => {
    onPress?.(doctor);
  };

  return (
    <Card
      variant="elevated"
      style={styles.card}
      onPress={onPress ? handlePress : undefined}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={`${doctor.name}, ${doctor.specialties.join(', ')}`}
    >
      <View style={styles.headerRow}>
        <Image
          uri={doctor.avatarUrl}
          priority="high"
          style={styles.avatar}
          borderRadius={theme.radius.md}
        />

        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text variant="h3" color="primary" numberOfLines={1} style={styles.name}>
              {doctor.name}
            </Text>
            {doctor.availability ? (
              <Badge
                label={doctor.availability}
                variant="success"
              />
            ) : null}
          </View>

          <Text variant="caption" color="secondary" numberOfLines={1} style={styles.degree}>
            {doctor.degree}
          </Text>

          <View style={styles.metaRow}>
            <View style={styles.ratingContainer}>
              <Text variant="caption" style={styles.ratingStar}>
                {STRINGS.common.ratingStar}
              </Text>
              <Text variant="caption" color="primary">
                {doctor.rating.toFixed(1)} ({doctor.reviewCount})
              </Text>
            </View>
            <Text variant="caption" color="muted">•</Text>
            <Text variant="caption" color="secondary">
              {doctor.experienceYears} {STRINGS.common.yearsExp}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.specialtiesRow}>
        {doctor.specialties.map((spec) => (
          <Badge key={spec} label={spec} variant="primary" />
        ))}
      </View>

      <View style={styles.footerRow}>
        <View style={styles.feeContainer}>
          <Text variant="caption" color="muted">
            {STRINGS.consultation.feeLabel}
          </Text>
          <Text variant="body" color="primary" style={styles.feeAmount}>
            {STRINGS.common.currencySymbol}{doctor.consultationFee}
          </Text>
        </View>

        <Button
          variant="secondary"
          size="small"
          onPress={onPress ? handlePress : undefined}
          accessibilityLabel={`${STRINGS.consultation.upcomingSlot.doctorDetailsCta} ${doctor.name}`}
          style={styles.arrowButton}
        >
          <MaterialCommunityIcons
            name="arrow-right"
            size={18}
            color={theme.colors.primary}
          />
        </Button>
      </View>
    </Card>
  );
});

DoctorCard.displayName = 'DoctorCard';
export default DoctorCard;
