import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { STRINGS } from '@utils';
import { AppStackParamList } from './types';
import { BottomTabNavigator } from './BottomTabNavigator';
import {
  DoctorDetailsScreen,
  BookingSuccessScreen,
  UpcomingSlotScreen,
} from '@features/consultation/screens';
import {
  SearchScreen,
  ProductDetailsScreen,
  CartScreen,
  OrderPlacedScreen,
} from '@features/shop/screens';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name={STRINGS.navigation.routes.mainTabs}
        component={BottomTabNavigator}
      />
      <Stack.Screen
        name={STRINGS.navigation.routes.doctorDetails}
        component={DoctorDetailsScreen}
      />
      <Stack.Screen
        name={STRINGS.navigation.routes.bookingSuccess}
        component={BookingSuccessScreen}
      />
      <Stack.Screen
        name={STRINGS.navigation.routes.upcomingSlot}
        component={UpcomingSlotScreen}
      />
      <Stack.Screen
        name={STRINGS.navigation.routes.search}
        component={SearchScreen}
      />
      <Stack.Screen
        name={STRINGS.navigation.routes.productDetails}
        component={ProductDetailsScreen}
      />
      <Stack.Screen
        name={STRINGS.navigation.routes.cart as any}
        component={CartScreen}
      />
      <Stack.Screen
        name={STRINGS.navigation.routes.orderPlaced as any}
        component={OrderPlacedScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
