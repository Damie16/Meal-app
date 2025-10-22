import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MenuItem } from '../types/MenuItem';

interface MenuItemCardProps {
  item: MenuItem;
  showCheckbox?: boolean;
  onToggle?: () => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ 
  item, 
  showCheckbox, 
  onToggle 
}) => (
  <View style={styles.menuCard}>
    <View style={styles.menuCardHeader}>
      <View style={styles.menuCardInfo}>
        <Text style={styles.dishName}>{item.dishName}</Text>
        <View style={styles.courseBadge}>
          <Text style={styles.courseBadgeText}>{item.course}</Text>
        </View>
      </View>
      {showCheckbox && (
        <TouchableOpacity
          style={[styles.checkbox, item.selected && styles.checkboxSelected]}
          onPress={onToggle}>
          {item.selected && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
      )}
    </View>
    <Text style={styles.description}>{item.description}</Text>
    <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
  </View>
);

const styles = StyleSheet.create({
  menuCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  menuCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  menuCardInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  courseBadge: {
    backgroundColor: '#667eea',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  courseBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#667eea',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#667eea',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});