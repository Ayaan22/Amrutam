import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { BottomTabParamList } from './types';
import { ShopScreen } from '@features/shop/screens/ShopScreen';
import { HealthRecordsScreen } from '@features/health-records/screens/HealthRecordsScreen';
import { DoctorListings } from '@features/consultation/screens/DoctorListings';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const renderConsultIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => (
  <MaterialCommunityIcons
    name={focused ? 'doctor' : 'doctor'}
    color={color}
    size={size || 24}
  />
);

const renderShopIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => (
  <MaterialCommunityIcons
    name={focused ? 'shopping' : 'shopping-outline'}
    color={color}
    size={size || 24}
  />
);

const renderHealthRecordsIcon = ({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) => (
  <MaterialCommunityIcons
    name={focused ? 'clipboard-pulse' : 'clipboard-pulse-outline'}
    color={color}
    size={size || 24}
  />
);

export const BottomTabNavigator: React.FC = () => {
  const { colors, typography } = useTheme();
  const insets = useSafeAreaInsets();
  const screenOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.textMuted,
      tabBarStyle: {
        backgroundColor: colors.surface,
        borderTopColor: colors.borderLight,
        borderTopWidth: 1,
        elevation: 8,
        shadowColor: colors.textPrimary,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        height: Platform.OS === 'ios' ? 88 : 64 + insets.bottom,
        paddingBottom: Platform.OS === 'ios' ? 28 : 10 + insets.bottom,
        paddingTop: 8,
      },
      tabBarLabelStyle: {
        ...typography.caption,
        fontWeight: '600' as const,
        fontSize: 11,
        marginTop: 2,
      },
    }),
    [colors, typography,insets],
  );

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={STRINGS.navigation.routes.consult}
        component={DoctorListings}
        options={{
          tabBarLabel: STRINGS.navigation.tabs.consult,
          tabBarIcon: renderConsultIcon,
        }}
      />
      <Tab.Screen
        name={STRINGS.navigation.routes.shop}
        component={ShopScreen}
        options={{
          tabBarLabel: STRINGS.navigation.tabs.shop,
          tabBarIcon: renderShopIcon,
        }}
      />
      <Tab.Screen
        name={STRINGS.navigation.routes.healthRecords}
        component={HealthRecordsScreen}
        options={{
          tabBarLabel: STRINGS.navigation.tabs.healthRecords,
          tabBarIcon: renderHealthRecordsIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
