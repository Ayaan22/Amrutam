import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Card } from '../../../components';
import { useTheme } from '../../../theme';

export const ConsultationScreen: React.FC = () => {
  const { colors, spacing } = useTheme();

  return (
    <Surface style={styles.container}>
      <View style={styles.content}>
        <Text variant="h1" color="primary" style={styles.header}>
          Consult
        </Text>
        <Text variant="body" color="secondary" style={styles.subtitle}>
          Find certified Ayurvedic practitioners and book 1-on-1 consultations
        </Text>

        <Card variant="elevated" style={styles.card}>
          <Text variant="h3" color="primary" style={styles.cardTitle}>
            Book Ayurvedic Doctor
          </Text>
          <Text variant="body" color="secondary">
            Personalized treatment plans for your unique dosha profile.
          </Text>
        </Card>
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
    padding: 20,
  },
  header: {
    marginBottom: 6,
  },
  subtitle: {
    marginBottom: 20,
  },
  card: {
    marginTop: 8,
  },
  cardTitle: {
    marginBottom: 8,
  },
});

export default ConsultationScreen;
