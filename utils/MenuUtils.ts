import { MenuItem, Course } from '../types/MenuItem';


export const calculateAveragePrice = (items: MenuItem[]): number => {
    if (items.length === 0) return 0;

    let total = 0;

    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }

    return total / items.length;
};

export const calculateTotalPrice = (items: MenuItem[]): number => {
    let total = 0;
    let index = 0;


    while (index < items.length) {
        total += items[index].price;
        index++;
    }

    return total;
};


export const calculateAveragePriceByCourse = (
    items: MenuItem[],
    course: Course
): number => {
    const courseItems = items.filter(item => item.course === course);
    return calculateAveragePrice(courseItems);
};


export const filterMenuItemsByCourse = (
    items: MenuItem[],
    course: Course | null
): MenuItem[] => {
    if (!course) return items;
    return items.filter(item => item.course === course);
};


export const getTotalItemsCount = (items: MenuItem[]): number => {
    return items.length;
};


export const generateUniqueId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};