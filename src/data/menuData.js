// src/data/menuData.js
import BurgerImg from '../assets/images/Burger.jpg';
import CoffeeImg from '../assets/images/Coffee.jpg';
import DorowotImg from '../assets/images/Dorowot.jpg';
import KitfoImg from '../assets/images/Kitfo.jpg';
import ShiroImg from '../assets/images/Shiro.jpg';
import TejImg from '../assets/images/Tej.jpg';

export const initialFoods = [
  { id: 1, name: "Spicy Burger", price: 12.99, category: "Burger", rating: 4.5, image: BurgerImg, description: "Juicy beef patty with spicy sauce" },
  { id: 2, name: "Ethiopian Coffee", price: 3.99, category: "Beverage", rating: 4.8, image: CoffeeImg, description: "Authentic Ethiopian coffee" },
  { id: 3, name: "Doro Wat", price: 15.99, category: "Ethiopian", rating: 4.9, image: DorowotImg, description: "Spicy chicken stew with egg" },
  { id: 4, name: "Kitfo", price: 14.99, category: "Ethiopian", rating: 4.7, image: KitfoImg, description: "Minced raw beef with spices" },
  { id: 5, name: "Shiro Wat", price: 10.99, category: "Ethiopian", rating: 4.6, image: ShiroImg, description: "Chickpea stew" },
  { id: 6, name: "Tej", price: 5.99, category: "Beverage", rating: 4.4, image: TejImg, description: "Honey wine" },
  { id: 7, name: "Cheese Burger", price: 11.99, category: "Burger", rating: 4.3, image: BurgerImg, description: "Classic cheeseburger" },
  { id: 8, name: "Double Burger", price: 15.99, category: "Burger", rating: 4.6, image: BurgerImg, description: "Double patty burger" }
];

export const categories = ["All", "Burger", "Ethiopian", "Beverage"];