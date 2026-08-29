import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Text, Card, SearchBar } from '../../../components';
import { useTheme } from '../../../theme';

export const ShopScreen: React.FC = () => {
  const { colors, spacing } = useTheme();

  return (
    <Surface style={styles.container}>
      <View style={styles.content}>
        <Text variant="h1" color="primary" style={styles.header}>
          Ayurvedic Shop
        </Text>
        <Text variant="body" color="secondary" style={styles.subtitle}>
          Pure herbal formulations, natural remedies & wellness products
        </Text>

        <SearchBar
          placeholder="Search authentic herbs, remedies..."
          showFilter
          style={styles.searchBar}
        />

        <Card variant="outlined" style={styles.card}>
          <Text variant="h3" color="primary" style={styles.cardTitle}>
            Featured Herbal Formulations
          </Text>
          <Text variant="body" color="secondary">
            Clinically validated Ayurvedic supplements sourced directly from nature.
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
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 20,
  },
  card: {
    marginTop: 4,
  },
  cardTitle: {
    marginBottom: 8,
  },
});

export default ShopScreen;
