import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Surface, Text, Card, Badge, Button, Image } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { AppStackParamList } from '@app/navigation/types';
import { useCartStore } from '../../../store/cartStore';
import { useWishlistStore } from '../../../store/wishlistStore';
import { CartBadgeButton } from '../components';
import { createStyles } from './ProductDetailsScreen.styles';

type ProductDetailsRouteProp = RouteProp<AppStackParamList, 'ProductDetails'>;
type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

export const ProductDetailsScreen: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ProductDetailsRouteProp>();

  const { product } = route.params;
  const [localQuantity, setLocalQuantity] = useState(1);

  const cartItems = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cartTotalCount = useCartStore((state) => state.getTotalCount());

  const isWishlisted = useWishlistStore((state) =>
    state.items.some((item) => item.id === product.id)
  );
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  // Check if this product is already in the user's cart
  const cartItem = cartItems.find((item) => item.product.id === product.id);
  const isInCart = Boolean(cartItem);
  const currentQuantity = isInCart ? cartItem!.quantity : localQuantity;

  const handleIncrement = () => {
    if (isInCart) {
      updateQuantity(product.id, Math.min(currentQuantity + 1, 10));
    } else {
      setLocalQuantity((prev) => Math.min(prev + 1, 10));
    }
  };

  const handleDecrement = () => {
    if (isInCart) {
      updateQuantity(product.id, currentQuantity - 1);
    } else {
      setLocalQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  const handlePrimaryAction = () => {
    if (isInCart) {
      navigation.navigate(STRINGS.navigation.routes.cart as any);
    } else {
      addToCart(product, localQuantity);
    }
  };

  return (
    <Surface style={styles.container}>
      {/* Clean Top Header (Using Button component for back icon) */}
      <View style={styles.header}>
        <Button
          variant="ghost"
          size="small"
          onPress={() => navigation.goBack()}
          accessibilityLabel={STRINGS.common.back}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={theme.colors.textPrimary}
          />
        </Button>

        <Text variant="h3" color="primary" style={styles.headerTitle}>
          {STRINGS.shop.productDetails.headerTitle}
        </Text>

        <View style={styles.headerActions}>
          <Button
            variant="ghost"
            size="small"
            onPress={() => toggleWishlist(product)}
            accessibilityLabel={
              isWishlisted
                ? STRINGS.shop.wishlist.removedSuccess(product.name)
                : STRINGS.shop.wishlist.addedSuccess(product.name)
            }
          >
            <MaterialCommunityIcons
              name={isWishlisted ? 'heart' : 'heart-outline'}
              size={24}
              color={isWishlisted ? theme.colors.error : theme.colors.primary}
            />
          </Button>

          <CartBadgeButton
            count={cartTotalCount}
            onPress={() => navigation.navigate(STRINGS.navigation.routes.cart as any)}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Product Hero Image */}
        <View style={styles.heroImageContainer}>
          <Image
            uri={product.imageUrl}
            priority="high"
            style={styles.heroImage}
            borderRadius={theme.radius.lg}
          />
        </View>

        {/* Product Main Info */}
        <View style={styles.infoSection}>
          <View style={styles.categoryRow}>
            <Text variant="caption" color="muted">
              {product.category}
            </Text>
            {isInCart && (
              <Badge
                label={`✓ ${STRINGS.shop.productDetails.inCartBadge} (${currentQuantity})`}
                variant="primary"
              />
            )}
          </View>

          <Text variant="h1" color="primary" style={styles.productName}>
            {product.name}
          </Text>

          <Text variant="body" color="secondary" style={styles.productSubtitle}>
            {product.subtitle} • {product.volume}
          </Text>

          {/* Price & Rating Row */}
          <View style={styles.priceRatingRow}>
            <View style={styles.priceContainer}>
              <Text variant="h1" color="primary" style={styles.priceText}>
                {STRINGS.common.currencySymbol}{product.price}
              </Text>
              {product.originalPrice > product.price && (
                <Text variant="body" color="muted" style={styles.originalPriceText}>
                  {STRINGS.common.currencySymbol}{product.originalPrice}
                </Text>
              )}
              {product.discountPercentage > 0 && (
                <Badge
                  label={`${product.discountPercentage}% OFF`}
                  variant="success"
                />
              )}
            </View>

            <View style={styles.ratingBadge}>
              <Text style={styles.ratingStar}>{STRINGS.common.ratingStar}</Text>
              <Text style={styles.ratingText}>
                {product.rating.toFixed(1)} ({product.reviewCount})
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Product Description */}
          <View style={styles.detailsBlock}>
            <Text variant="h3" color="primary" style={styles.sectionTitle}>
              {STRINGS.shop.productDetails.aboutTitle}
            </Text>
            <Text variant="body" color="secondary" style={styles.descriptionText}>
              {product.description}
            </Text>
          </View>

          {/* How to Use */}
          {product.dosage ? (
            <View style={styles.detailsBlock}>
              <Text variant="h3" color="primary" style={styles.sectionTitle}>
                {STRINGS.shop.productDetails.dosageTitle}
              </Text>
              <Card variant="outlined" style={styles.dosageCard}>
                <Text variant="body" color="secondary" style={styles.dosageText}>
                  {product.dosage}
                </Text>
              </Card>
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* Reactive Bottom Bar */}
      <View style={styles.bottomBar}>
        {/* Quantity Stepper synced with Cart */}
        <View style={styles.quantityBox}>
          <Button
            variant="ghost"
            size="small"
            onPress={handleDecrement}
            accessibilityLabel={STRINGS.shop.cart.decreaseQuantity}
            style={styles.quantityBtn}
          >
            <MaterialCommunityIcons
              name="minus"
              size={16}
              color={theme.colors.textPrimary}
            />
          </Button>

          <Text variant="body" color="primary" style={styles.quantityValue}>
            {currentQuantity}
          </Text>

          <Button
            variant="ghost"
            size="small"
            onPress={handleIncrement}
            accessibilityLabel={STRINGS.shop.cart.increaseQuantity}
            style={styles.quantityBtn}
          >
            <MaterialCommunityIcons
              name="plus"
              size={16}
              color={theme.colors.textPrimary}
            />
          </Button>
        </View>

        {/* Primary Action Button (Add to Cart vs Go to Cart) */}
        <Button
          title={
            isInCart
              ? STRINGS.shop.productDetails.goToCartCta
              : `${STRINGS.shop.addToCartCta} • ${STRINGS.common.currencySymbol}${product.price * localQuantity}`
          }
          variant="primary"
          size="large"
          onPress={handlePrimaryAction}
          style={styles.addToCartButton}
        />
      </View>
    </Surface>
  );
};

export default ProductDetailsScreen;
