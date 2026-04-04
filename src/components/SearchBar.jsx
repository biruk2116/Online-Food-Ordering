// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative mb-8">
      <input
        type="text"
        placeholder="Search for delicious food..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="input pl-12"
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
    </div>
  );
};

export default SearchBar;