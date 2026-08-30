import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Surface } from '@core-components';
import { useTheme } from '@theme';
import { STRINGS } from '@utils';

export const LoginScreen: React.FC = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.background,
    },
  });

  return (
    <Surface style={styles.container}>
      <Text variant="h2" color="primary">
        {STRINGS.auth.welcomeTitle}
      </Text>
      <Text variant="body" color="secondary">
        {STRINGS.auth.welcomeSubtitle}
      </Text>
    </Surface>
  );
};

export default LoginScreen;