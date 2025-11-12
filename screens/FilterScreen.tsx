import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MenuItem, Course } from '../types/MenuItem';
import { ScreenHeader } from '../components/ScreenHeader';
import { MenuItemCard } from '../components/MenuItemCard';
import { filterMenuItemsByCourse } from '../utils/MenuUtils';

interface FilterScreenProps {
  menuItems: MenuItem[];
  filterCourse: string | null;
  onFilterChange: (course: string | null) => void;
  onBack: () => void;
}

export const FilterScreen: React.FC<FilterScreenProps> = ({
  menuItems,
  filterCourse,
  onFilterChange,
  onBack,
}) => {
  const filteredItems = filterMenuItemsByCourse(menuItems, filterCourse as Course | null);

  return (
    <View style={styles.container}>
      <ScreenHeader title="Filter Menu" onBack={onBack} />
      
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Filter by Course:</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[styles.filterButton, !filterCourse && styles.filterButtonSelected]}
            onPress={() => onFilterChange(null)}>
            <Text style={[styles.filterButtonText, !filterCourse && styles.filterButtonTextSelected]}>
              All
            </Text>
          </TouchableOpacity>
          {(['Starter', 'Main', 'Dessert'] as Course[]).map(c => (
            <TouchableOpacity
              key={c}
              style={[styles.filterButton, filterCourse === c && styles.filterButtonSelected]}
              onPress={() => onFilterChange(c)}>
              <Text style={[styles.filterButtonText, filterCourse === c && styles.filterButtonTextSelected]}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.resultsText}>
          Showing {filteredItems.length} item(s) {filterCourse ? `in ${filterCourse}` : 'from all courses'}
        </Text>
        {filteredItems.map(item => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  filterSection: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#667eea',
    alignItems: 'center',
  },
  filterButtonSelected: {
    backgroundColor: '#667eea',
  },
  filterButtonText: {
    color: '#667eea',
    fontWeight: '600',
    fontSize: 14,
  },
  filterButtonTextSelected: {
    color: '#ffffff',
  },
  resultsText: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '600',
    marginBottom: 15,
  },
});