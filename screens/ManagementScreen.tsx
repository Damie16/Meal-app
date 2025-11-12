import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MenuItem, Screen } from '../types/MenuItem';
import { ScreenHeader } from '../components/ScreenHeader';
import { MenuItemCard } from '../components/MenuItemCard';

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
  onBack,
}) => {
  const selectedCount = menuItems.filter(item => item.selected).length;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Manage Menu Items" onBack={onBack} />
      
      <View style={styles.managementHeader}>
        <Text style={styles.managementInfo}>
          {selectedCount} item(s) selected
        </Text>
        {selectedCount > 0 && (
          <TouchableOpacity style={styles.removeButton} onPress={onRemoveSelected}>
            <Text style={styles.removeButtonText}>Remove Selected</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content}>
        {menuItems.map(item => (
          <MenuItemCard
            key={item.id}
            item={item}
            showCheckbox
            onToggle={() => onToggleSelection(item.id)}
          />
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
  managementHeader: {
    backgroundColor: '#ffffff',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  managementInfo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});