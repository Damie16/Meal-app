import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { MenuItem, Course } from '../types/MenuItem';
import { ScreenHeader } from '../components/ScreenHeader';
import { CustomButton } from '../components/CustomButton';

interface AddItemScreenProps {
  onSave: (item: Omit<MenuItem, 'id'>) => void;
  onCancel: () => void;
}

export const AddItemScreen: React.FC<AddItemScreenProps> = ({ onSave, onCancel }) => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Starter');
  const [price, setPrice] = useState('');

  const handleSave = () => {
    
    if (!dishName.trim() || !description.trim() || !price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    
    onSave({
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: priceNum,
    });
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Add Menu Item" onBack={onCancel} />
      
      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={styles.input}
            value={dishName}
            onChangeText={setDishName}
            placeholder="Enter dish name"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
          />

          <Text style={styles.label}>Course</Text>
          <View style={styles.courseButtons}>
            {(['Starter', 'Main', 'Dessert'] as Course[]).map(c => (
              <TouchableOpacity
                key={c}
                style={[styles.courseButton, course === c && styles.courseButtonSelected]}
                onPress={() => setCourse(c)}>
                <Text style={[styles.courseButtonText, course === c && styles.courseButtonTextSelected]}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="0.00"
            placeholderTextColor="#999"
            keyboardType="decimal-pad"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton title="Cancel" onPress={onCancel} variant="secondary" />
        <View style={styles.buttonSpacer} />
        <CustomButton title="Save Item" onPress={handleSave} />
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
  form: {
    padding: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    color: '#2c3e50',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  courseButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  courseButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#667eea',
    alignItems: 'center',
  },
  courseButtonSelected: {
    backgroundColor: '#667eea',
  },
  courseButtonText: {
    color: '#667eea',
    fontWeight: '600',
  },
  courseButtonTextSelected: {
    color: '#ffffff',
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