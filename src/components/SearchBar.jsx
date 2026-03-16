import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange }) => {
    const hasValue = value.length > 0;

    return (
        <div className={`relative w-full transition-all duration-500 ${hasValue ? 'scale-105' : ''}`}>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`h-4 w-4 transition-colors ${hasValue ? 'text-brand-600' : 'text-slate-400'}`} />
            </div>
            <input
                type="text"
                className={`block w-full pl-11 pr-4 py-2.5 border-none rounded-2xl text-sm leading-5 bg-slate-100 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all duration-300 ${hasValue ? 'bg-white shadow-xl shadow-brand-500/10 ring-1 ring-brand-500/20' : 'hover:bg-slate-200'}`}
                placeholder="Search flavors..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
