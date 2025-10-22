import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MenuItem } from '../types/MenuItem';
import { ScreenHeader } from '../components/ScreenHeader';
import { MenuItemCard } from '../components/MenuItemCard';
import { StatsCard } from '../components/StatsCard';

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
  const filteredItems = filterCourse
    ? menuItems.filter(item => item.course === filterCourse)
    : menuItems;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Filter Menu Items" onBack={onBack} />

      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.filterTab, !filterCourse && styles.filterTabActive]}
          onPress={() => onFilterChange(null)}>
          <Text
            style={[
              styles.filterTabText,
              !filterCourse && styles.filterTabTextActive,
            ]}>
            All
          </Text>
        </TouchableOpacity>
        {['Starter', 'Main', 'Dessert'].map(c => (
          <TouchableOpacity
            key={c}
            style={[
              styles.filterTab,
              filterCourse === c && styles.filterTabActive,
            ]}
            onPress={() => onFilterChange(c)}>
            <Text
              style={[
                styles.filterTabText,
                filterCourse === c && styles.filterTabTextActive,
              ]}>
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <StatsCard
        label={`${filterCourse || 'All'} Items`}
        value={filteredItems.length}
      />

      <ScrollView style={styles.filterResults}>
        <FlatList
          data={filteredItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <MenuItemCard item={item} />}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  filterTabs: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  filterTab: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  filterTabActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  filterTabText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  filterTabTextActive: {
    color: '#ffffff',
  },
  filterResults: {
    padding: 15,
  },
});