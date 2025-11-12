import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Course } from '../types/MenuItem';

interface CourseAverageCardProps {
  course: Course;
  average: number;
  count: number;
}

export const CourseAverageCard: React.FC<CourseAverageCardProps> = ({ 
  course, 
  average, 
  count 
}) => (
  <View style={styles.card}>
    <Text style={styles.courseTitle}>{course}</Text>
    <Text style={styles.averagePrice}>R {average.toFixed(2)}</Text>
    <Text style={styles.itemCount}>{count} item(s)</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginHorizontal: 4,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  averagePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 12,
    color: '#7f8c8d',
  },
});