import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import NetInfo from '@react-native-community/netinfo';
import { ThemeProvider } from '@theme';
import { ErrorBoundary, OfflineNotice } from '@core-components';
import { RootNavigator } from '@app/navigation';
import { useNetworkStore } from '@store';

const App = () => {
  useEffect(() => {
    BootSplash.hide({ fade: true });

    // Subscribe to native OS network connectivity events (Wi-Fi, Cellular, Airplane Mode)
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isOnline = Boolean(
        state.isConnected && (state.isInternetReachable ?? true)
      );
      useNetworkStore.getState().setOnlineStatus(isOnline);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <OfflineNotice />
          <RootNavigator />
        </ErrorBoundary>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
