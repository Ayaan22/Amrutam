import React from 'react';
import {
  View,
  Modal,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Button, Image, EmptyState } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { Product } from '../../types';
import { useWishlistStore, useCartStore } from '@store';
import { createStyles } from './WishlistModal.styles';
import { WishlistModalProps } from './WishlistModal.types';

export const WishlistModal: React.FC<WishlistModalProps> = ({
  visible,
  onClose,
  onSelectProduct,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  const wishlistItems = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleMoveToCart = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const handleItemPress = (product: Product) => {
    onClose();
    onSelectProduct(product);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheetContainer}>
              {/* Header */}
              <View style={styles.header}>
                <Text variant="h3" color="primary" style={styles.headerTitle}>
                  {STRINGS.shop.wishlist.headerTitle(wishlistItems.length)}
                </Text>
                <Button
                  variant="ghost"
                  size="small"
                  onPress={onClose}
                  accessibilityLabel={STRINGS.common.close}
                  style={styles.closeBtn}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={22}
                    color={theme.colors.textPrimary}
                  />
                </Button>
              </View>

              {/* Items List */}
              {wishlistItems.length === 0 ? (
                <EmptyState
                  title={STRINGS.shop.wishlist.emptyTitle}
                  description={STRINGS.shop.wishlist.emptyDescription}
                  actionLabel={STRINGS.shop.wishlist.exploreCta}
                  onActionPress={onClose}
                />
              ) : (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.listContent}
                >
                  {wishlistItems.map((product) => (
                    <View key={product.id} style={styles.itemCard}>
                      <Pressable
                        onPress={() => handleItemPress(product)}
                        style={styles.itemPressable}
                      >
                        <Image
                          uri={product.imageUrl}
                          style={styles.itemImage}
                          borderRadius={theme.radius.sm}
                        />
                        <View style={styles.itemInfo}>
                          <Text variant="h3" color="primary" numberOfLines={1} style={styles.itemTitle}>
                            {product.name}
                          </Text>
                          <Text variant="caption" color="secondary" numberOfLines={1}>
                            {product.volume}
                          </Text>
                          <Text variant="body" style={styles.itemPrice}>
                            {STRINGS.common.currencySymbol}{product.price}
                          </Text>
                        </View>
                      </Pressable>

                      {/* Move to Cart & Remove Actions */}
                      <View style={styles.itemActions}>
                        <Button
                          variant="secondary"
                          size="small"
                          title={STRINGS.shop.wishlist.moveToCart}
                          onPress={() => handleMoveToCart(product)}
                          style={styles.moveToCartBtn}
                        />

                        <Button
                          variant="ghost"
                          size="small"
                          onPress={() => removeFromWishlist(product.id)}
                          accessibilityLabel={STRINGS.shop.wishlist.removeFromWishlist}
                          style={styles.removeBtn}
                        >
                          <MaterialCommunityIcons
                            name="trash-can-outline"
                            size={20}
                            color={theme.colors.error}
                          />
                        </Button>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default WishlistModal;
