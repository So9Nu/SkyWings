import React from 'react';
import { Star, StarHalf } from 'lucide-react';

function ReviewCard({ name, image, rating, review, date, location }) {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 min-w-[320px] md:min-w-[380px]">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
        />
        <div>
          <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1">
          {renderStars(rating)}
        </div>
        <span className="text-gray-600 font-semibold">{rating.toFixed(1)}</span>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 leading-relaxed mb-3">
        "{review}"
      </p>

      {/* Date */}
      <p className="text-sm text-gray-400">{date}</p>
    </div>
  );
}

export default ReviewCard;

