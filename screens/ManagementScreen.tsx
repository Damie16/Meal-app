import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { MenuItem, Screen } from '../types/MenuItem';
import { ScreenHeader } from '../components/ScreenHeader';
import { MenuItemCard } from '../components/MenuItemCard';
import { CustomButton } from '../components/CustomButton';

interface ManagementScreenProps {
  menuItems: MenuItem[];
  onToggleSelection: (id: string) => void;
  onRemoveSelected: () => void;
  onNavigate: (screen: Screen) => void;
  onBack: () => void;
}

export const ManagementScreen: React.FC<ManagementScreenProps> = ({
  menuItems,
  onToggleSelection,
  onRemoveSelected,
  onNavigate,
  onBack,
}) => {
  const getAveragePriceByCourse = () => {
    const courses = ['Starter', 'Main', 'Dessert'];
    return courses.map(courseName => {
      const courseItems = menuItems.filter(item => item.course === courseName);
      const avg =
        courseItems.length > 0
          ? courseItems.reduce((sum, item) => sum + item.price, 0) /
            courseItems.length
          : 0;
      return { course: courseName, average: avg };
    });
  };

  const avgPrices = getAveragePriceByCourse();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Menu Management" onBack={onBack} />
      <ScrollView>
        <View style={styles.managementActions}>
          <CustomButton
            title="Add New"
            onPress={() => onNavigate('AddItem')}
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={onRemoveSelected}>
            <Text style={styles.removeButtonText}>Remove Selected</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.analyticsSection}>
          <Text style={styles.sectionTitle}>Average Prices by Course</Text>
          {avgPrices.map(({ course, average }) => (
            <View key={course} style={styles.analyticsCard}>
              <Text style={styles.analyticsLabel}>{course}</Text>
              <Text style={styles.analyticsValue}>R {average.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Items to Remove</Text>
          <FlatList
            data={menuItems}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <MenuItemCard
                item={item}
                showCheckbox
                onToggle={() => onToggleSelection(item.id)}
              />
            )}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  managementActions: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  removeButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  analyticsSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  analyticsCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  analyticsLabel: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  analyticsValue: {
    fontSize: 18,
    color: '#667eea',
    fontWeight: 'bold',
  },
  section: {
    padding: 15,
  },
});
