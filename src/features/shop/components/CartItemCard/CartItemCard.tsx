import React, { memo } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Text, Button, Image } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { createStyles } from './CartItemCard.styles';
import { CartItemCardProps } from './CartItemCard.types';

export const CartItemCard: React.FC<CartItemCardProps> = memo(({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { product, quantity } = item;

  return (
    <Card variant="elevated" style={styles.itemCard}>
      <View style={styles.itemRow}>
        {/* Thumbnail */}
        <Image
          uri={product.imageUrl}
          priority="high"
          style={styles.thumbnail}
          borderRadius={theme.radius.md}
        />

        {/* Product Details */}
        <View style={styles.itemDetails}>
          <View style={styles.itemTitleRow}>
            <Text variant="h3" color="primary" numberOfLines={1} style={styles.itemName}>
              {product.name}
            </Text>

            <Button
              variant="ghost"
              size="small"
              onPress={() => onRemove(product.id)}
              accessibilityLabel={`${STRINGS.common.delete} ${product.name}`}
              style={styles.deleteBtn}
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={20}
                color={theme.colors.error}
              />
            </Button>
          </View>

          <Text variant="caption" color="muted" style={styles.itemVolume}>
            {product.volume} • {product.category}
          </Text>

          {/* Price and Quantity Stepper Row */}
          <View style={styles.itemFooter}>
            <Text variant="body" color="primary" style={styles.itemPrice}>
              {STRINGS.common.currencySymbol}{product.price * quantity}
            </Text>

            <View style={styles.stepper}>
              <Button
                variant="ghost"
                size="small"
                onPress={() => onUpdateQuantity(product.id, quantity - 1)}
                accessibilityLabel={STRINGS.shop.cart.decreaseQuantity}
                style={styles.stepperBtn}
              >
                <MaterialCommunityIcons
                  name="minus"
                  size={14}
                  color={theme.colors.textPrimary}
                />
              </Button>

              <Text variant="bodySmall" color="primary" style={styles.stepperValue}>
                {quantity}
              </Text>

              <Button
                variant="ghost"
                size="small"
                onPress={() => onUpdateQuantity(product.id, quantity + 1)}
                accessibilityLabel={STRINGS.shop.cart.increaseQuantity}
                style={styles.stepperBtn}
              >
                <MaterialCommunityIcons
                  name="plus"
                  size={14}
                  color={theme.colors.textPrimary}
                />
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
});

CartItemCard.displayName = 'CartItemCard';
export default CartItemCard;
