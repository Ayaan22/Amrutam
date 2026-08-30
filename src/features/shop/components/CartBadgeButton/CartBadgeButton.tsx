import React, { memo } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Button } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { createStyles } from './CartBadgeButton.styles';
import { CartBadgeButtonProps } from './CartBadgeButton.types';

export const CartBadgeButton: React.FC<CartBadgeButtonProps> = memo(({
  count,
  onPress,
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <Button
      variant="ghost"
      size="small"
      onPress={onPress}
      accessibilityLabel={STRINGS.shop.cart.viewCartCta}
      style={styles.button}
    >
      <MaterialCommunityIcons
        name="shopping-outline"
        size={24}
        color={theme.colors.primary}
      />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </Button>
  );
});

CartBadgeButton.displayName = 'CartBadgeButton';
export default CartBadgeButton;
