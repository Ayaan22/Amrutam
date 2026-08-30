import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Surface, Text, EmptyState, Button } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';
import { useAppStore } from '@store';
import {
  UpcomingSlotHeroCard,
  PreConsultationGuidelines,
} from '@features/consultation/components';
import { AppStackParamList } from '@app/navigation/types';
import { createStyles } from './UpcomingSlotScreen.styles';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

export const UpcomingSlotScreen: React.FC = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NavigationProp>();

  const activeBooking = useAppStore((state) => state.activeBooking);
  const cancelBooking = useAppStore((state) => state.cancelBooking);

  const handleCancelBooking = () => {
    if (!activeBooking) return;

    Alert.alert(
      STRINGS.consultation.upcomingSlot.cancelModalTitle,
      STRINGS.consultation.upcomingSlot.cancelModalMessage(activeBooking.doctor.name),
      [
        {
          text: STRINGS.consultation.upcomingSlot.keepAppointment,
          style: 'cancel',
        },
        {
          text: STRINGS.consultation.upcomingSlot.confirmCancel,
          style: 'destructive',
          onPress: () => {
            cancelBooking(activeBooking.id);
            Alert.alert(
              STRINGS.common.appName,
              STRINGS.consultation.upcomingSlot.cancelledSuccessAlert,
              [{ text: STRINGS.common.ok }]
            );
          },
        },
      ]
    );
  };

  const handleJoinCall = () => {
    if (!activeBooking) return;
    Alert.alert(
      STRINGS.consultation.upcomingSlot.joinCallCta,
      `Connecting to secure Ayurvedic video consultation room with ${activeBooking.doctor.name}...`,
      [{ text: STRINGS.common.ok }]
    );
  };

  const handleDoctorPress = () => {
    if (activeBooking) {
      navigation.navigate(STRINGS.navigation.routes.doctorDetails, {
        doctor: activeBooking.doctor,
      });
    }
  };

  return (
    <Surface style={styles.container}>
      {/* Top Header with core Button */}
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
          {STRINGS.consultation.upcomingSlot.headerTitle}
        </Text>
      </View>

      {!activeBooking ? (
        <EmptyState
          title={STRINGS.consultation.upcomingSlot.emptyTitle}
          description={STRINGS.consultation.upcomingSlot.emptyDescription}
          actionLabel={STRINGS.consultation.upcomingSlot.findDoctorsCta}
          onActionPress={() => {
            navigation.navigate(STRINGS.navigation.routes.mainTabs as any, {
              screen: STRINGS.navigation.tabs.consult,
            });
          }}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Upcoming Slot Hero Card Component */}
          <UpcomingSlotHeroCard
            booking={activeBooking}
            onJoinCall={handleJoinCall}
            onCancelBooking={handleCancelBooking}
            onDoctorPress={handleDoctorPress}
          />

          {/* Pre-Consultation Guidelines Component */}
          <PreConsultationGuidelines />
        </ScrollView>
      )}
    </Surface>
  );
};

export default UpcomingSlotScreen;
