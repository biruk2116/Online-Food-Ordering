import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center space-x-1 text-orange-400">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} size={16} fill="currentColor" />
            ))}
            {hasHalfStar && <StarHalf size={16} fill="currentColor" />}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} size={16} className="text-slate-300" />
            ))}
            <span className="text-sm text-slate-500 ml-1">{rating.toFixed(1)}</span>
        </div>
    );
};

export default RatingStars;
