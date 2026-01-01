import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, ArrowRight, Plane, Star, TrendingUp } from 'lucide-react';

function Domestic() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('roundtrip');
  const [formData, setFormData] = useState({
    from: 'Kathmandu',
    to: 'Pokhara',
    departDate: '2026-01-15',
    returnDate: '2026-01-18',
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    }
  });

  const domesticCities = [
    'Kathmandu',
    'Pokhara',
    'Biratnagar',
    'Lukla',
    'Bharatpur',
    'Nepalgunj',
    'Janakpur',
    'Dhangadhi',
    'Bhairahawa',
    'Tumlingtar',
    'Jomsom',
    'Simara'
  ];

  const popularRoutes = [
    {
      from: 'Kathmandu',
      to: 'Pokhara',
      price: 7500,
      duration: '25 min',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80',
      discount: 38
    },
    {
      from: 'Kathmandu',
      to: 'Lukla',
      price: 18000,
      duration: '35 min',
      image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=400&q=80',
      discount: 28
    },
    {
      from: 'Pokhara',
      to: 'Jomsom',
      price: 15000,
      duration: '20 min',
      image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=400&q=80',
      discount: 25
    },
    {
      from: 'Kathmandu',
      to: 'Biratnagar',
      price: 8000,
      duration: '40 min',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=400&q=80',
      discount: 27
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search', { state: { formData, tripType, flightType: 'domestic' } });
  };

  const totalPassengers = formData.passengers.adults + formData.passengers.children + formData.passengers.infants;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">Domestic Flights</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Explore Nepal by Air
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Book affordable domestic flights to discover the beauty of Nepal - from mountain peaks to cultural cities
            </p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-white">
          <form onSubmit={handleSearch}>
            {/* Trip Type Selector */}
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => setTripType('roundtrip')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  tripType === 'roundtrip'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Round Trip
              </button>
              <button
                type="button"
                onClick={() => setTripType('oneway')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  tripType === 'oneway'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                One Way
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* From */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">From</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                  <select
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold cursor-pointer"
                    required
                  >
                    {domesticCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* To */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">To</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 w-5 h-5" />
                  <select
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold cursor-pointer"
                    required
                  >
                    {domesticCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Departure Date */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Departure</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                  <input
                    type="date"
                    value={formData.departDate}
                    onChange={(e) => setFormData({ ...formData, departDate: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                    required
                  />
                </div>
              </div>

              {/* Return Date */}
              {tripType === 'roundtrip' && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Return</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 w-5 h-5" />
                    <input
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Passengers */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                  <div className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl font-semibold bg-white">
                    {totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Plane className="w-6 h-6" />
              Search Domestic Flights
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>

      {/* Popular Domestic Routes */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">Most Booked</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Domestic Routes</h2>
          <p className="text-gray-600 text-lg">Fly to Nepal's most visited destinations with great deals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRoutes.map((route, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => {
                setFormData({ ...formData, from: route.from, to: route.to });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={route.image}
                  alt={route.to}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {route.discount}% OFF
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-900">{route.from}</span>
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-gray-900">{route.to}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Plane className="w-4 h-4" />
                    {route.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    4.8
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">Starting from</span>
                    <p className="text-2xl font-bold text-blue-600">रु {route.price.toLocaleString()}</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Domestic Flights */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Fly Domestic with SkyWings?</h2>
            <p className="text-blue-100 text-lg">Experience the best of Nepal's aviation services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quick & Convenient</h3>
              <p className="text-blue-100">Save time with short flight durations across Nepal</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multiple Destinations</h3>
              <p className="text-blue-100">Connect to 12+ domestic airports across Nepal</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Best Prices</h3>
              <p className="text-blue-100">Competitive fares with exclusive discounts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Domestic;

