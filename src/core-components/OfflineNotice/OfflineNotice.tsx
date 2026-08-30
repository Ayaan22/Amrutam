import React, { memo, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme';
import { STRINGS } from '../../constants/strings';
import { useNetworkStore } from '../../store/networkStore';
import { OfflineNoticeProps } from './OfflineNotice.types';
import { createStyles } from './OfflineNotice.styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const OfflineNotice: React.FC<OfflineNoticeProps> = memo(
  ({ isOffline: propIsOffline, showToggle = true }) => {
    const theme = useTheme();
    const styles = createStyles(theme);
    const insets = useSafeAreaInsets();

    const storeIsOnline = useNetworkStore(state => state.isOnline);
    const isSyncing = useNetworkStore(state => state.isSyncing);
    const showSyncSuccessToast = useNetworkStore(
      state => state.showSyncSuccessToast,
    );
    const safeAreaStyle = {
      marginTop: insets.top,
    };
    const toggleOnlineStatus = useNetworkStore(
      state => state.toggleOnlineStatus,
    );
    const dismissSyncToast = useNetworkStore(state => state.dismissSyncToast);

    const isOffline =
      propIsOffline !== undefined ? propIsOffline : !storeIsOnline;

    useEffect(() => {
      if (showSyncSuccessToast) {
        const timer = setTimeout(() => {
          dismissSyncToast();
        }, 3500);
        return () => clearTimeout(timer);
      }
    }, [showSyncSuccessToast, dismissSyncToast]);

    // If online, not syncing, and no success toast, render nothing
    if (!isOffline && !isSyncing && !showSyncSuccessToast) {
      return null;
    }

    if (isSyncing) {
      return (
        <View style={[styles.container, styles.syncingBanner, safeAreaStyle]}>
          <View style={styles.contentRow}>
            <ActivityIndicator
              size="small"
              color={theme.colors.textInverse}
              style={styles.icon}
            />
            <Text style={styles.text}>
              {STRINGS.offlineNotice.syncingMessage}
            </Text>
          </View>
        </View>
      );
    }

    if (showSyncSuccessToast && !isOffline) {
      return (
        <View style={[styles.container, styles.successToast]}>
          <View style={styles.contentRow}>
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={16}
              color={theme.colors.textInverse}
              style={styles.icon}
            />
            <Text style={styles.text}>
              {STRINGS.offlineNotice.syncSuccessMessage}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.container, styles.offlineBanner, safeAreaStyle]}>
        <View style={styles.contentRow}>
          <MaterialCommunityIcons
            name="cloud-off-outline"
            size={15}
            color={theme.colors.textInverse}
            style={styles.icon}
          />
          <Text style={styles.text}>
            {STRINGS.offlineNotice.offlineMessage}
          </Text>
        </View>

        {showToggle && (
          <Pressable
            onPress={toggleOnlineStatus}
            style={styles.toggleButton}
            accessibilityRole="button"
            accessibilityLabel={STRINGS.offlineNotice.toggleNetwork}
          >
            <Text style={styles.toggleButtonText}>
              {STRINGS.offlineNotice.goOnline}
            </Text>
          </Pressable>
        )}
      </View>
    );
  },
);

OfflineNotice.displayName = 'OfflineNotice';
export default OfflineNotice;
