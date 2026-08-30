import React, { memo } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, Button } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { createStyles } from './WishlistBadgeButton.styles';
import { WishlistBadgeButtonProps } from './WishlistBadgeButton.types';

export const WishlistBadgeButton: React.FC<WishlistBadgeButtonProps> = memo(({
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
      accessibilityLabel={STRINGS.shop.wishlist.headerTitle(count)}
      style={styles.button}
    >
      <MaterialCommunityIcons
        name={count > 0 ? 'heart' : 'heart-outline'}
        size={24}
        color={count > 0 ? theme.colors.error : theme.colors.primary}
      />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </Button>
  );
});

WishlistBadgeButton.displayName = 'WishlistBadgeButton';
export default WishlistBadgeButton;
