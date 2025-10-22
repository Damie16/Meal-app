export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: 'Starter' | 'Main' | 'Dessert';
  price: number;
  selected?: boolean;
}

export type Screen = 'Home' | 'AddItem' | 'Filter' | 'Management';