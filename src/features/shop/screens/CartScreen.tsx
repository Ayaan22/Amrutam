import React, { useCallback } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';
import { Surface, Text, Button, EmptyState } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { AppStackParamList } from '@app/navigation/types';
import { useCartStore, useNetworkStore, CartItem } from '@store';
import { enqueueOfflineOrder } from '@services';
import { CartItemCard, PriceSummaryCard } from '../components';
import { createStyles } from './CartScreen.styles';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

export const CartScreen: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp>();

  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const totalCount = useCartStore((state) => state.getTotalCount());

  const handlePlaceOrder = () => {
    const isOnline = useNetworkStore.getState().isOnline;
    const orderNumber = `AMR-ORD-${Date.now().toString().slice(-6)}`;
    const finalAmount = totalPrice;
    const finalCount = totalCount;
    const currentItems = [...items];

    if (!isOnline) {
      enqueueOfflineOrder({
        orderId: orderNumber,
        items: currentItems,
        totalAmount: finalAmount,
        itemCount: finalCount,
        createdAt: new Date().toISOString(),
        syncStatus: 'pending_sync',
      });
      useNetworkStore.getState().updatePendingCount();
    }

    clearCart();
    navigation.replace(STRINGS.navigation.routes.orderPlaced as any, {
      orderId: orderNumber,
      itemCount: finalCount,
      totalAmount: finalAmount,
      isOfflineQueued: !isOnline,
    });
  };

  const renderCartItem = useCallback(
    ({ item }: { item: CartItem }) => (
      <CartItemCard
        item={item}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
    ),
    [removeFromCart, updateQuantity]
  );

  const renderFooter = () => (
    <PriceSummaryCard totalCount={totalCount} totalPrice={totalPrice} />
  );

  return (
    <Surface style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Button
          variant="ghost"
          size="small"
          onPress={() => navigation.goBack()}
          accessibilityLabel={STRINGS.common.back}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={theme.colors.textPrimary}
          />
        </Button>

        <Text variant="h3" color="primary" style={styles.headerTitle}>
          {STRINGS.shop.cart.headerTitle(totalCount)}
        </Text>

        {items.length > 0 ? (
          <Button
            variant="ghost"
            size="small"
            onPress={clearCart}
            accessibilityLabel={STRINGS.shop.cart.clearCartCta}
            style={styles.clearBtn}
          >
            <Text variant="caption" color="error" style={styles.clearText}>
              {STRINGS.shop.cart.clearCartCta}
            </Text>
          </Button>
        ) : (
          <View style={styles.clearBtn} />
        )}
      </View>

      {items.length === 0 ? (
        <EmptyState
          title={STRINGS.shop.cart.emptyTitle}
          description={STRINGS.shop.cart.emptyDescription}
          actionLabel={STRINGS.shop.cart.emptyAction}
          onActionPress={() => navigation.goBack()}
        />
      ) : (
        <>
          <FlashList
            data={items}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.product.id}
            ListFooterComponent={renderFooter}
            contentContainerStyle={styles.listContent}
          />

          {/* Sticky Bottom Place Order Action */}
          <View style={styles.bottomBar}>
            <View style={styles.bottomPriceCol}>
              <Text variant="caption" color="muted">
                {STRINGS.shop.cart.totalPayableLabel}
              </Text>
              <Text variant="h2" color="primary" style={styles.bottomPrice}>
                {STRINGS.common.currencySymbol}{totalPrice}
              </Text>
            </View>

            <Button
              title={STRINGS.shop.cart.placeOrderCta}
              variant="primary"
              size="large"
              onPress={handlePlaceOrder}
              style={styles.placeOrderBtn}
            />
          </View>
        </>
      )}
    </Surface>
  );
};

export default CartScreen;
