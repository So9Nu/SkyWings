import React from 'react';
import { Star } from 'lucide-react';

function DealCard({ image, destination, rating, reviews, price }) {
  return (
    <div className="min-w-[300px] md:min-w-[350px] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={destination}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Destination */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{destination}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-lg font-semibold">
            <span>{rating}</span>
            <Star className="w-4 h-4 fill-current" />
          </div>
          <span className="text-gray-600">({reviews} Reviews)</span>
        </div>

        {/* Price */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Per Night</p>
          <p className="text-3xl font-bold text-blue-600">PKR {price.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default DealCard;

