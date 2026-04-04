// src/data/menuData.js (Enhanced)
import BurgerImg from '../assets/images/Burger.jpg';
import CoffeeImg from '../assets/images/Coffee.jpg';
import DorowotImg from '../assets/images/Dorowot.jpg';
import KitfoImg from '../assets/images/Kitfo.jpg';
import ShiroImg from '../assets/images/Shiro.jpg';
import TejImg from '../assets/images/Tej.jpg';

export const initialCategories = [
  { id: 1, name: 'All', image: 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png' },
  { id: 2, name: 'Burger', image: 'https://cdn-icons-png.flaticon.com/512/1046/1046785.png' },
  { id: 3, name: 'Ethiopian', image: 'https://cdn-icons-png.flaticon.com/512/1046/1046786.png' },
  { id: 4, name: 'Beverage', image: 'https://cdn-icons-png.flaticon.com/512/1046/1046787.png' }
];

export const initialFoods = [
  { 
    id: 1, name: "Spicy Burger", price: 12.99, category: "Burger", rating: 4.5, 
    image: BurgerImg, 
    shortDescription: "Juicy beef patty with spicy sauce",
    description: "Our signature spicy burger features a juicy beef patty topped with pepper jack cheese, crispy lettuce, tomatoes, onions, and our secret spicy sauce. Served with a side of crispy fries.",
    calories: 850, carbs: 65, protein: 35
  },
  { 
    id: 2, name: "Ethiopian Coffee", price: 3.99, category: "Beverage", rating: 4.8, 
    image: CoffeeImg,
    shortDescription: "Authentic Ethiopian coffee",
    description: "Traditional Ethiopian coffee made from high-quality Arabica beans, roasted and brewed fresh. Served with popcorn for an authentic experience.",
    calories: 5, carbs: 1, protein: 0
  },
  { 
    id: 3, name: "Doro Wat", price: 15.99, category: "Ethiopian", rating: 4.9, 
    image: DorowotImg,
    shortDescription: "Spicy chicken stew with egg",
    description: "Ethiopia's most famous dish - tender chicken simmered in a spicy berbere sauce with onions, garlic, ginger, and a hard-boiled egg. Served with injera.",
    calories: 650, carbs: 45, protein: 42
  },
  { 
    id: 4, name: "Kitfo", price: 14.99, category: "Ethiopian", rating: 4.7, 
    image: KitfoImg,
    shortDescription: "Minced raw beef with spices",
    description: "Premium quality minced beef seasoned with mitmita and kibe (spiced butter). Served with ayib (cottage cheese) and gomen (collard greens).",
    calories: 550, carbs: 15, protein: 48
  },
  { 
    id: 5, name: "Shiro Wat", price: 10.99, category: "Ethiopian", rating: 4.6, 
    image: ShiroImg,
    shortDescription: "Chickpea stew",
    description: "A comforting stew made from ground chickpeas and broad beans, simmered with onions, garlic, and berbere sauce. Vegan-friendly and protein-rich.",
    calories: 380, carbs: 55, protein: 18
  },
  { 
    id: 6, name: "Tej", price: 5.99, category: "Beverage", rating: 4.4, 
    image: TejImg,
    shortDescription: "Honey wine",
    description: "Traditional Ethiopian honey wine, slightly sweet with a hint of bitterness. Made from fermented honey and gesho leaves.",
    calories: 180, carbs: 25, protein: 0
  },
  { 
    id: 7, name: "Cheese Burger", price: 11.99, category: "Burger", rating: 4.3, 
    image: BurgerImg,
    shortDescription: "Classic cheeseburger",
    description: "Classic cheeseburger with melted cheddar cheese, lettuce, tomato, onion, pickles, and special sauce.",
    calories: 780, carbs: 58, protein: 32
  },
  { 
    id: 8, name: "Double Burger", price: 15.99, category: "Burger", rating: 4.6, 
    image: BurgerImg,
    shortDescription: "Double patty burger",
    description: "Two juicy beef patties stacked with double cheese, bacon, lettuce, tomato, and our signature sauce.",
    calories: 1050, carbs: 72, protein: 52
  }
];