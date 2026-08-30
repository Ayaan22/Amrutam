import React, { memo } from 'react';
import { View } from 'react-native';
import { Card, Text, Badge } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { createStyles } from './PriceSummaryCard.styles';
import { PriceSummaryCardProps } from './PriceSummaryCard.types';

export const PriceSummaryCard: React.FC<PriceSummaryCardProps> = memo(
  ({ totalCount, totalPrice }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
      <View style={styles.container}>
        <Card variant="outlined" style={styles.card}>
          <Text variant="h3" color="primary" style={styles.title}>
            {STRINGS.shop.cart.priceSummaryTitle}
          </Text>

          <View style={styles.row}>
            <Text variant="body" color="secondary">
              {STRINGS.shop.cart.itemsSubtotalLabel(totalCount)}
            </Text>
            <Text variant="body" color="primary" style={styles.value}>
              {STRINGS.common.currencySymbol}
              {totalPrice}
            </Text>
          </View>

          <View style={styles.row}>
            <Text variant="body" color="secondary">
              {STRINGS.shop.cart.packagingLabel}
            </Text>
            <Badge label={STRINGS.shop.cart.freeBadge} variant="success" />
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text variant="h3" color="primary">
              {STRINGS.shop.cart.totalAmountLabel}
            </Text>
            <Text variant="h2" color="primary" style={styles.totalValue}>
              {STRINGS.common.currencySymbol}
              {totalPrice}
            </Text>
          </View>
        </Card>
      </View>
    );
  },
);

PriceSummaryCard.displayName = 'PriceSummaryCard';
export default PriceSummaryCard;
