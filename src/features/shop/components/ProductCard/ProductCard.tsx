import React, { memo } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Text, Badge, Image, Button } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { useCartStore, useWishlistStore } from '@store';
import { ProductCardProps } from './ProductCard.types';
import { createStyles } from './ProductCard.styles';

export const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product, onPress, testID }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    const cartItem = useCartStore((state) =>
      state.items.find((item) => item.product.id === product.id)
    );

    const isWishlisted = useWishlistStore((state) =>
      state.items.some((item) => item.id === product.id)
    );
    const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

    const handlePress = () => {
      onPress?.(product);
    };

    const handleHeartPress = () => {
      toggleWishlist(product);
    };

    return (
      <Card
        variant="elevated"
        style={styles.card}
        onPress={onPress ? handlePress : undefined}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={`${product.name}, Price ${STRINGS.common.currencySymbol}${product.price}`}
      >
        <View style={styles.contentRow}>
          {/* Product Image */}
          <Image
            uri={product.imageUrl}
            priority="high"
            style={styles.image}
            borderRadius={theme.radius.md}
          />

          {/* Info */}
          <View style={styles.infoCol}>
            <View style={styles.topCategoryRow}>
              <View style={styles.categoryLeft}>
                <Text variant="caption" color="muted">
                  {product.category}
                </Text>
                {cartItem && (
                  <Badge
                    label={`In Cart (${cartItem.quantity})`}
                    variant="primary"
                  />
                )}
              </View>

              {/* Heart Wishlist Button */}
              <Button
                variant="ghost"
                size="small"
                onPress={handleHeartPress}
                accessibilityLabel={
                  isWishlisted
                    ? STRINGS.shop.wishlist.removedSuccess(product.name)
                    : STRINGS.shop.wishlist.addedSuccess(product.name)
                }
                style={styles.heartBtn}
              >
                <MaterialCommunityIcons
                  name={isWishlisted ? 'heart' : 'heart-outline'}
                  size={20}
                  color={isWishlisted ? theme.colors.error : theme.colors.textMuted}
                />
              </Button>
            </View>

            <Text
              variant="h3"
              color="primary"
              numberOfLines={1}
              style={styles.title}
            >
              {product.name}
            </Text>

            <Text
              variant="caption"
              color="secondary"
              numberOfLines={1}
              style={styles.subtitle}
            >
              {product.subtitle} • {product.volume}
            </Text>

            {/* Rating & Price Row */}
            <View style={styles.bottomRow}>
              <View style={styles.priceRow}>
                <Text variant="body" color="primary" style={styles.price}>
                  {STRINGS.common.currencySymbol}
                  {product.price}
                </Text>
                {product.originalPrice > product.price && (
                  <Text
                    variant="caption"
                    color="muted"
                    style={styles.originalPrice}
                  >
                    {STRINGS.common.currencySymbol}
                    {product.originalPrice}
                  </Text>
                )}
                {product.discountPercentage > 0 && (
                  <Badge
                    label={`${product.discountPercentage}% OFF`}
                    variant="success"
                  />
                )}
              </View>

              <View style={styles.ratingRow}>
                <Text variant="caption" style={styles.ratingStar}>
                  {STRINGS.common.ratingStar}
                </Text>
                <Text
                  variant="caption"
                  color="primary"
                  style={styles.ratingText}
                >
                  {product.rating.toFixed(1)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
    );
  },
);

ProductCard.displayName = 'ProductCard';
export default ProductCard;
