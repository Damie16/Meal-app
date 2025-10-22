import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { MenuItem, Screen } from '../types/MenuItem';
import { CustomButton } from '../components/CustomButton';
import { MenuItemCard } from '../components/MenuItemCard';
import { StatsCard } from '../components/StatsCard';

interface HomeScreenProps {
  menuItems: MenuItem[];
  onNavigate: (screen: Screen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ 
  menuItems, 
  onNavigate 
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#667eea" />
      <ScrollView>
        <View style={styles.screenHeader}>
          <Text style={styles.appTitle}>Christoffel's Menu</Text>
        </View>

        <StatsCard label="Total Menu Items" value={menuItems.length} />

        <View style={styles.actionButtons}>
          <CustomButton
            title="Add Item"
            onPress={() => onNavigate('AddItem')}
          />
          <CustomButton
            title="Filter"
            onPress={() => onNavigate('Filter')}
            variant="secondary"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu Items</Text>
          <FlatList
            data={menuItems}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <MenuItemCard item={item} />}
            scrollEnabled={false}
          />
        </View>

        <TouchableOpacity
          style={styles.managementLink}
          onPress={() => onNavigate('Management')}>
          <Text style={styles.managementLinkText}>
            Go to Menu Management →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  screenHeader: {
    backgroundColor: '#667eea',
    padding: 20,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 10,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  managementLink: {
    padding: 20,
    alignItems: 'center',
  },
  managementLinkText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: '600',
  },
});