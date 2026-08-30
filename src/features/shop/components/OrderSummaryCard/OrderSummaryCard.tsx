import React, { memo } from 'react';
import { View, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Text, Badge } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { createStyles } from './OrderSummaryCard.styles';
import { OrderSummaryCardProps } from './OrderSummaryCard.types';

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = memo(
  ({ fadeAnim, orderId, itemCount, totalAmount }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Card variant="elevated" style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text variant="caption" color="muted">
                {STRINGS.shop.orderPlaced.orderReferenceLabel}
              </Text>
              <Text variant="h3" color="primary" style={styles.orderIdText}>
                {orderId}
              </Text>
            </View>

            <Badge
              label={STRINGS.shop.orderPlaced.confirmedStatus}
              variant="primary"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text variant="body" color="secondary">
              {STRINGS.shop.orderPlaced.totalItemsLabel}
            </Text>
            <Text variant="body" color="primary" style={styles.valueText}>
              {STRINGS.shop.orderPlaced.itemsCountLabel(itemCount)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text variant="body" color="secondary">
              {STRINGS.shop.orderPlaced.totalPaidLabel}
            </Text>
            <Text variant="h3" color="primary" style={styles.valueText}>
              {STRINGS.common.currencySymbol}
              {totalAmount}
            </Text>
          </View>

          <View style={styles.row}>
            <Text variant="body" color="secondary">
              {STRINGS.shop.orderPlaced.estimatedDeliveryLabel}
            </Text>
            <Text
              variant="body"
              color="success"
              style={[styles.valueText, styles.deliveryText]}
            >
              {STRINGS.shop.orderPlaced.deliveryTimeline}
            </Text>
          </View>

          <View style={styles.divider} />

          {/* Ayurvedic Quality Assurance */}
          <View style={styles.assuranceRow}>
            <MaterialCommunityIcons
              name="leaf"
              size={20}
              color={theme.colors.primary}
            />
            <Text
              variant="caption"
              color="secondary"
              style={styles.assuranceText}
            >
              {STRINGS.shop.orderPlaced.qualityAssuranceText}
            </Text>
          </View>
        </Card>
      </Animated.View>
    );
  },
);

OrderSummaryCard.displayName = 'OrderSummaryCard';
export default OrderSummaryCard;
