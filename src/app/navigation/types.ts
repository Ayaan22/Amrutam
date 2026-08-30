import { NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Doctor, Booking } from '@features/consultation/types';
import { Product, ProductCategory } from '@features/shop/types';

export type AuthStackParamList = {
  Login: undefined;
};

export type BottomTabParamList = {
  Consult: undefined;
  Shop: undefined;
  HealthRecords: undefined;
};

export type AppStackParamList = {
  MainTabs: NavigatorScreenParams<BottomTabParamList> | undefined;
  DoctorDetails: { doctor: Doctor };
  BookingSuccess: { booking: Booking };
  UpcomingSlot: { bookingId?: string } | undefined;
  Search: { initialQuery?: string; category?: ProductCategory } | undefined;
  ProductDetails: { product: Product };
  Cart: undefined;
  OrderPlaced: {
    orderId: string;
    itemCount: number;
    totalAmount: number;
    isOfflineQueued?: boolean;
  };
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
};

export type BottomTabProps<T extends keyof BottomTabParamList> = BottomTabScreenProps<
  BottomTabParamList,
  T
>;

export type AppStackProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>;

export type AuthStackProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>;
