import React, { memo } from 'react';
import { View, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Badge } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { createStyles } from './OrderCelebrationHeader.styles';
import { OrderCelebrationHeaderProps } from './OrderCelebrationHeader.types';

export const OrderCelebrationHeader: React.FC<OrderCelebrationHeaderProps> =
  memo(({ scaleAnim, fadeAnim }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
      <View style={styles.celebrationSection}>
        <Animated.View
          style={[
            styles.successCircleOuter,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={styles.successCircleInner}>
            <MaterialCommunityIcons
              name="check"
              size={44}
              color={theme.colors.textInverse}
            />
          </View>
        </Animated.View>

        <Animated.View style={[styles.titleWrapper, { opacity: fadeAnim }]}>
          <Badge
            label={STRINGS.shop.orderPlaced.confirmedBadge}
            variant="success"
            style={styles.badge}
          />
          <Text variant="h1" color="primary" style={styles.title}>
            {STRINGS.shop.orderPlaced.title}
          </Text>
          <Text variant="body" color="secondary" style={styles.subtitle}>
            {STRINGS.shop.orderPlaced.subtitle}
          </Text>
        </Animated.View>
      </View>
    );
  });

OrderCelebrationHeader.displayName = 'OrderCelebrationHeader';
export default OrderCelebrationHeader;
