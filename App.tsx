import React, { useState } from 'react';
import { Alert } from 'react-native';
import { MenuItem, Screen } from './types/MenuItem';
import { HomeScreen } from './screens/HomeScreen';
import { AddItemScreen } from './screens/AddItemScreen';
import { FilterScreen } from './screens/FilterScreen';
import { ManagementScreen } from './screens/ManagementScreen';
import { generateUniqueId } from './utils/MenuUtils';


const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    dishName: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan and croutons',
    course: 'Starter',
    price: 85,
  },
  {
    id: '2',
    dishName: 'Grilled Salmon',
    description: 'Atlantic salmon with lemon butter sauce',
    course: 'Main',
    price: 195,
  },
  {
    id: '3',
    dishName: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with vanilla ice cream',
    course: 'Dessert',
    price: 75,
  },
];

const App: React.FC = () => {
  
  const [currentScreen, setCurrentScreen] = useState<Screen>('Home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [filterCourse, setFilterCourse] = useState<string | null>(null);

  
  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  
  const navigateToHome = () => {
    setCurrentScreen('Home');
    setFilterCourse(null);
  };

  
  const handleSaveItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: generateUniqueId(),
    };

    
    setMenuItems([...menuItems, newItem]);
    Alert.alert('Success', 'Menu item added successfully!');
    navigateToHome();
  };

  
  const toggleItemSelection = (id: string) => {
    setMenuItems(
      menuItems.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  
  const handleRemoveSelected = () => {
    const selectedItems = menuItems.filter(item => item.selected);
    
    if (selectedItems.length === 0) {
      Alert.alert('Error', 'No items selected');
      return;
    }

    Alert.alert(
      'Confirm Deletion',
      `Remove ${selectedItems.length} item(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            
            setMenuItems(menuItems.filter(item => !item.selected));
            Alert.alert('Success', 'Items removed successfully!');
          },
        },
      ]
    );
  };

  
  switch (currentScreen) {
    case 'AddItem':
      return (
        <AddItemScreen
          onSave={handleSaveItem}
          onCancel={navigateToHome}
        />
      );

    case 'Filter':
      return (
        <FilterScreen
          menuItems={menuItems}
          filterCourse={filterCourse}
          onFilterChange={setFilterCourse}
          onBack={navigateToHome}
        />
      );

    case 'Management':
      return (
        <ManagementScreen
          menuItems={menuItems}
          onToggleSelection={toggleItemSelection}
          onRemoveSelected={handleRemoveSelected}
          onNavigate={navigateToScreen}
          onBack={navigateToHome}
        />
      );

    default:
      return (
        <HomeScreen
          menuItems={menuItems}
          onNavigate={navigateToScreen}
        />
      );
  }
};

export default App;
