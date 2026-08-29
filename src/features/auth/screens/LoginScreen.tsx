import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Button } from '../../../components';
import { useTheme } from '../../../theme';

export const LoginScreen: React.FC = () => {
  const { colors, spacing } = useTheme();

  return (
    <Surface style={styles.container}>
      <View style={styles.content}>
        <Text variant="h1" color="primary" style={styles.title}>
          Welcome to Amrutam
        </Text>
        <Text variant="body" color="secondary" style={styles.subtitle}>
          Your holistic Ayurvedic healthcare companion
        </Text>
        <Button
          title="Sign In"
          variant="primary"
          size="large"
          fullWidth
          onPress={() => {}}
          style={styles.button}
        />
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    marginTop: 16,
  },
});

export default LoginScreen;
