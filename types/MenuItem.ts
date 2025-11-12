export type Course = 'Starter' | 'Main' | 'Dessert';

export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: Course;  
  price: number;
  selected?: boolean;
}

export type Screen = 'Home' | 'AddItem' | 'Filter' | 'Management';