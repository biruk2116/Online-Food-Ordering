# 🍔 FoodieDash - Premium Online Food Ordering Platform

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.6-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.20.0-ca4245?logo=react-router)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Overview

FoodieDash is a modern, fully responsive online food ordering platform built with React and Tailwind CSS. It provides a seamless experience for users to browse menus, place orders, manage their accounts, and track order history. The platform includes both user-facing interfaces and an administrative dashboard for managing food items, categories, and orders.

### ✨ Key Features

- 🎨 **Modern UI/UX** - Clean, attractive design with smooth animations
- 🌓 **Dark/Light Mode** - Fully customizable theme with localStorage persistence
- 🛒 **Shopping Cart** - Real-time cart management with quantity controls
- 👤 **User Authentication** - Secure login/signup system with session management
- 🍽️ **Food Management** - Browse, search, and filter food items by category
- 📊 **Admin Dashboard** - Complete CRUD operations for foods, categories, and orders
- 📱 **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- 💾 **Local Storage** - Persistent data storage for cart, orders, and user preferences
- 🔍 **Search & Filter** - Search foods by name and filter by categories
- ⭐ **Ratings & Reviews** - User feedback system for food items
- 📍 **Interactive Map** - Google Maps integration for location tracking
- 🎯 **Smooth Scrolling** - Animated navigation between sections
- 🎨 **Floating Labels** - Modern form inputs with animated labels



## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Navigation and routing
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Inter, Poppins, Outfit)

### State Management
- **React Context API** - Global state management
- **Local Storage** - Client-side data persistence

### Development Tools
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure
📁 online-food-ordering/
│
├── 📁 public/
│   └── 📄 vite.svg
│
├── 📁 src/
│   │
│   ├── 📁 assets/
│   │   ├── 📁 images/
│   │   │   ├── 📄 Burger.jpg
│   │   │   ├── 📄 Coffee.jpg
│   │   │   ├── 📄 Dorowot.jpg
│   │   │   ├── 📄 Kitfo.jpg
│   │   │   ├── 📄 Shiro.jpg
│   │   │   └── 📄 Tej.jpg
│   │   │
│   │   └── 📁 icons/
│   │       └── 📄 logo.svg
│   │
│   ├── 📁 components/
│   │   ├── 📁 common/
│   │   │   ├── 📄 Navbar.jsx
│   │   │   ├── 📄 Footer.jsx
│   │   │   ├── 📄 SearchBar.jsx
│   │   │   └── 📄 RatingStars.jsx
│   │   │
│   │   ├── 📁 food/
│   │   │   ├── 📄 FoodCard.jsx
│   │   │   ├── 📄 FoodDetails.jsx
│   │   │   └── 📄 RecommendationSection.jsx
│   │   │
│   │   ├── 📁 cart/
│   │   │   ├── 📄 CartItem.jsx
│   │   │   └── 📄 CartSidebar.jsx
│   │   │
│   │   ├── 📁 admin/
│   │   │   ├── 📄 AdminFoodForm.jsx
│   │   │   └── 📄 AdminFoodTable.jsx
│   │   │
│   │   └── 📁 ui/
│   │       ├── 📄 CategoryFilter.jsx
│   │       └── 📄 QuickSearch.jsx
│   │
│   ├── 📁 context/
│   │   ├── 📄 AuthContext.jsx
│   │   ├── 📄 CartContext.jsx
│   │   ├── 📄 FoodContext.jsx
│   │   ├── 📄 OrderContext.jsx
│   │   └── 📄 SettingsContext.jsx
│   │
│   ├── 📁 pages/
│   │   ├── 📁 auth/
│   │   │   ├── 📄 Login.jsx
│   │   │   └── 📄 Signup.jsx
│   │   │
│   │   ├── 📁 user/
│   │   │   ├── 📄 Home.jsx
│   │   │   ├── 📄 Menu.jsx
│   │   │   ├── 📄 Cart.jsx
│   │   │   ├── 📄 Checkout.jsx
│   │   │   ├── 📄 OrderHistory.jsx
│   │   │   └── 📄 Account.jsx
│   │   │
│   │   └── 📁 admin/
│   │       └── 📄 AdminDashboard.jsx
│   │
│   ├── 📁 hooks/
│   │   ├── 📄 useAuth.js
│   │   ├── 📄 useCart.js
│   │   └── 📄 useLocalStorage.js
│   │
│   ├── 📁 services/
│   │   ├── 📄 api.js
│   │   └── 📄 storage.js
│   │
│   ├── 📁 utils/
│   │   ├── 📄 constants.js
│   │   ├── 📄 helpers.js
│   │   └── 📄 validators.js
│   │
│   ├── 📁 styles/
│   │   ├── 📄 globals.css
│   │   └── 📄 animations.css
│   │
│   ├── 📁 data/
│   │   └── 📄 menuData.js
│   │
│   ├── 📄 App.jsx
│   ├── 📄 main.jsx
│   └── 📄 index.css
│
├── 📄 .gitignore
├── 📄 index.html
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 postcss.config.js
├── 📄 tailwind.config.js
├── 📄 vite.config.js
└── 📄 README.md

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/online-food-ordering.git
cd online-food-ordering

npm install
# or
yarn install

npm install react-router-dom
# or
yarn add react-router-dom

npx tailwindcss init -p

Update tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
npm run dev
# or
yarn dev

npm run build
# or
yarn build

npm run preview
# or
yarn preview
