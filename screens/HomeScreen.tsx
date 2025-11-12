import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MenuItem, Screen } from '../types/MenuItem';
import { ScreenHeader } from '../components/ScreenHeader';
import { CustomButton } from '../components/CustomButton';
import { MenuItemCard } from '../components/MenuItemCard';
import { StatsCard } from '../components/StatsCard';
import { CourseAverageCard } from '../components/CourseAverageCard';
import {
  calculateAveragePrice,
  calculateAveragePriceByCourse,
  getTotalItemsCount,
} from '../utils/MenuUtils';

interface HomeScreenProps {
  menuItems: MenuItem[];
  onNavigate: (screen: Screen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ menuItems, onNavigate }) => {
 
  const totalItems = getTotalItemsCount(menuItems);
  const overallAverage = calculateAveragePrice(menuItems);
  
  
  const starterItems = menuItems.filter(item => item.course === 'Starter');
  const mainItems = menuItems.filter(item => item.course === 'Main');
  const dessertItems = menuItems.filter(item => item.course === 'Dessert');
  
  const starterAvg = calculateAveragePriceByCourse(menuItems, 'Starter');
  const mainAvg = calculateAveragePriceByCourse(menuItems, 'Main');
  const dessertAvg = calculateAveragePriceByCourse(menuItems, 'Dessert');

  return (
    <View style={styles.container}>
      <ScreenHeader title="Chef's Menu" />
      
      <ScrollView style={styles.content}>
        {}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Menu Statistics</Text>
          <View style={styles.statsRow}>
            <StatsCard label="Total Items" value={totalItems} />
            <StatsCard label="Overall Average" value={`R ${overallAverage.toFixed(2)}`} />
          </View>
        </View>

        {}
        <View style={styles.averageSection}>
          <Text style={styles.sectionTitle}>Average Price by Course</Text>
          <View style={styles.courseAverageRow}>
            <CourseAverageCard 
              course="Starter" 
              average={starterAvg} 
              count={starterItems.length} 
            />
            <CourseAverageCard 
              course="Main" 
              average={mainAvg} 
              count={mainItems.length} 
            />
            <CourseAverageCard 
              course="Dessert" 
              average={dessertAvg} 
              count={dessertItems.length} 
            />
          </View>
        </View>

        {}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Complete Menu ({totalItems} items)</Text>
          {menuItems.map(item => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton title="Add Item" onPress={() => onNavigate('AddItem')} />
        <View style={styles.buttonSpacer} />
        <CustomButton 
          title="Filter Menu" 
          onPress={() => onNavigate('Filter')} 
          variant="secondary" 
        />
        <View style={styles.buttonSpacer} />
        <CustomButton 
          title="Manage Items" 
          onPress={() => onNavigate('Management')} 
          variant="secondary" 
        />
      </View>
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
  },
  statsSection: {
    padding: 15,
  },
  averageSection: {
    padding: 15,
    paddingTop: 0,
  },
  menuSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  courseAverageRow: {
    flexDirection: 'row',
    gap: 8,
  },
  footer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  buttonSpacer: {
    width: 10,
  },
});