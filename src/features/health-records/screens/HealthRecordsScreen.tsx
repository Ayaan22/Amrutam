import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Card, Badge } from '../../../components';
import { useTheme } from '../../../theme';

export const HealthRecordsScreen: React.FC = () => {
  const { colors, spacing } = useTheme();

  return (
    <Surface style={styles.container}>
      <View style={styles.content}>
        <Text variant="h1" color="primary" style={styles.header}>
          Health Records
        </Text>
        <Text variant="body" color="secondary" style={styles.subtitle}>
          Secure digital vault for your prescriptions, lab reports & dosha assessments
        </Text>

        <Card variant="elevated" style={styles.card}>
          <View style={styles.badgeRow}>
            <Badge label="Ayurvedic Assessment" variant="success" />
          </View>
          <Text variant="h3" color="primary" style={styles.cardTitle}>
            Prakriti & Vikriti Evaluation
          </Text>
          <Text variant="body" color="secondary">
            Keep track of your vital metrics, pulse readings, and historical consultation notes.
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
  badgeRow: {
    marginBottom: 10,
  },
  cardTitle: {
    marginBottom: 8,
  },
});

export default HealthRecordsScreen;
