import React, { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';

const RatingStars = ({ rating, onRate }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const isInteractive = !!onRate;

    // Display rating is either the hovered star or the actual rating
    const displayRating = hoverRating > 0 ? hoverRating : rating;

    const fullStars = Math.floor(displayRating);
    const hasHalfStar = displayRating % 1 !== 0 && hoverRating === 0; // Don't show half stars while hovering
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const handleMouseEnter = (index) => {
        if (!isInteractive) return;
        setHoverRating(index);
    };

    const handleMouseLeave = () => {
        if (!isInteractive) return;
        setHoverRating(0);
    };

    const handleClick = (index) => {
        if (!isInteractive) return;
        onRate(index);
    };

    const renderStar = (type, index, value) => {
        const props = {
            size: 16,
            className: `${type === 'empty' ? 'text-slate-300' : 'fill-currentColor text-orange-400'} ${isInteractive ? 'cursor-pointer transition-transform hover:scale-125' : ''}`,
            onMouseEnter: () => handleMouseEnter(value),
            onMouseLeave: handleMouseLeave,
            onClick: () => handleClick(value)
        };

        if (type === 'half') {
            return <StarHalf key={`half-${index}`} {...props} />;
        }
        return <Star key={`${type}-${index}`} {...props} />;
    };

    return (
        <div className="flex items-center space-x-1" onMouseLeave={handleMouseLeave}>
            {[...Array(fullStars)].map((_, i) => renderStar('full', i, i + 1))}
            {hasHalfStar && renderStar('half', 0, fullStars + 0.5)}
            {[...Array(emptyStars)].map((_, i) => {
                const value = fullStars + (hasHalfStar ? 1 : 0) + i + 1;
                return renderStar('empty', i, value);
            })}
            <span className="text-sm text-slate-500 ml-1 ml-2 font-medium">{rating.toFixed(1)}</span>
        </div>
    );
};

export default RatingStars;
