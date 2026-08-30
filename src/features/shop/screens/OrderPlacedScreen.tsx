import React, { useEffect, useRef } from 'react';
import { View, ScrollView, Animated } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Surface, Button } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { AppStackParamList } from '@app/navigation/types';
import { OrderCelebrationHeader, OrderSummaryCard } from '../components';
import { createStyles } from './OrderPlacedScreen.styles';

type OrderPlacedRouteProp = RouteProp<AppStackParamList, 'OrderPlaced'>;
type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

export const OrderPlacedScreen: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<OrderPlacedRouteProp>();

  const { orderId, itemCount, totalAmount, isOfflineQueued } = route.params;

  // Animation for celebration
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, fadeAnim]);

  const handleContinueShopping = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: STRINGS.navigation.routes.mainTabs as any }],
    });
  };

  return (
    <Surface style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Celebration Header Component */}
        <OrderCelebrationHeader
          scaleAnim={scaleAnim}
          fadeAnim={fadeAnim}
          isOfflineQueued={isOfflineQueued}
        />

        {/* Order Details Summary Card Component */}
        <OrderSummaryCard
          fadeAnim={fadeAnim}
          orderId={orderId}
          itemCount={itemCount}
          totalAmount={totalAmount}
        />
      </ScrollView>

      {/* Sticky Bottom Continue CTA */}
      <View style={styles.bottomBar}>
        <Button
          title={STRINGS.shop.orderPlaced.continueShoppingCta}
          variant="primary"
          size="large"
          onPress={handleContinueShopping}
          style={styles.continueBtn}
        />
      </View>
    </Surface>
  );
};

export default OrderPlacedScreen;
