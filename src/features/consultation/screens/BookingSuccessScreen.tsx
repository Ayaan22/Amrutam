import React, { useEffect, useRef } from 'react';
import { View, ScrollView, Animated } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Surface, Text, Badge, Button } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { BookingSummaryCard } from '@features/consultation/components';
import { AppStackParamList } from '@app/navigation/types';
import { createStyles } from './BookingSuccessScreen.styles';

type BookingSuccessRouteProp = RouteProp<AppStackParamList, 'BookingSuccess'>;
type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

export const BookingSuccessScreen: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<BookingSuccessRouteProp>();

  const { booking } = route.params;

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

    // Auto-navigate to UpcomingSlotScreen after 1.8s
    const timer = setTimeout(() => {
      navigation.replace(STRINGS.navigation.routes.upcomingSlot as any, {
        bookingId: booking.id,
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, [booking.id, fadeAnim, navigation, scaleAnim]);

  const handleViewUpcoming = () => {
    navigation.replace(STRINGS.navigation.routes.upcomingSlot as any, {
      bookingId: booking.id,
    });
  };

  return (
    <Surface style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Celebration Header */}
        <View style={styles.celebrationSection}>
          <Animated.View
            style={[
              styles.successCircleOuter,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <View style={styles.successCircleInner}>
              <MaterialCommunityIcons
                name="check"
                size={44}
                color={theme.colors.textInverse}
              />
            </View>
          </Animated.View>

          <Animated.View style={[styles.titleWrapper, { opacity: fadeAnim }]}>
            <Badge
              label={
                booking.isOfflineQueued
                  ? STRINGS.consultation.bookingSuccess.offlineQueuedBadge
                  : STRINGS.consultation.bookingSuccess.badgeLabel
              }
              variant={booking.isOfflineQueued ? 'primary' : 'success'}
              style={styles.badge}
            />
            <Text variant="h1" color="primary" style={styles.title}>
              {STRINGS.consultation.bookingSuccess.title}
            </Text>
            <Text variant="body" color="secondary" style={styles.subtitle}>
              {booking.isOfflineQueued
                ? STRINGS.consultation.bookingSuccess.offlineQueuedSubtitle
                : STRINGS.consultation.bookingSuccess.subtitle}
            </Text>
          </Animated.View>
        </View>

        {/* Booking Summary Card Component */}
        <BookingSummaryCard booking={booking} fadeAnim={fadeAnim} />
      </ScrollView>

      {/* Sticky Bottom View Upcoming CTA */}
      <View style={styles.bottomBar}>
        <Button
          title={STRINGS.consultation.bookingSuccess.viewUpcomingCta}
          variant="primary"
          size="large"
          onPress={handleViewUpcoming}
          style={styles.actionButton}
        />
      </View>
    </Surface>
  );
};

export default BookingSuccessScreen;
