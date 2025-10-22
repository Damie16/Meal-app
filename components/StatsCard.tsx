import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsCardProps {
  label: string;
  value: string | number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value }) => (
  <View style={styles.statsCard}>
    <Text style={styles.statsLabel}>{label}</Text>
    <Text style={styles.statsValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  statsCard: {
    backgroundColor: '#ffffff',
    margin: 15,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
});
