import React from 'react';
import { Star, MapPin, Clock, TrendingDown } from 'lucide-react';

function DealCard({ image, destination, rating, reviews, price, discount, departureCity, duration }) {
  return (
    <div className="min-w-[320px] md:min-w-[380px] bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border border-gray-100">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={destination}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
            <TrendingDown className="w-4 h-4" />
            {discount}% OFF
          </div>
        )}
        {/* Hot Deal Badge */}
        <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-semibold text-xs shadow-md">
          🔥 HOT DEAL
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Destination with Icon */}
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{destination}</h3>
        </div>

        {/* Departure City & Duration */}
        {(departureCity || duration) && (
          <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
            {departureCity && (
              <span className="flex items-center gap-1">
                <span className="text-gray-400">From</span> {departureCity}
              </span>
            )}
            {duration && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-400" />
                {duration}
              </span>
            )}
          </div>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-lg font-semibold shadow-sm">
            <Star className="w-4 h-4 fill-current" />
            <span>{rating}</span>
          </div>
          <span className="text-gray-500 text-sm">{reviews}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-4"></div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-gray-500 mb-1">Starting from</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-blue-600">₹{price.toLocaleString()}</p>
              {discount && (
                <p className="text-lg text-gray-400 line-through">₹{Math.round(price / (1 - discount / 100)).toLocaleString()}</p>
              )}
            </div>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default DealCard;
