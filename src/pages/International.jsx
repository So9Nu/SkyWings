import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, ArrowRight, Plane, Globe, TrendingUp, Star } from 'lucide-react';

function International() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('roundtrip');
  const [formData, setFormData] = useState({
    from: 'Kathmandu',
    to: 'Dubai',
    departDate: '2026-02-15',
    returnDate: '2026-02-22',
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    }
  });

  const internationalCities = [
    // Nepal
    'Kathmandu',
    'Pokhara',
    // India
    'Delhi',
    'Mumbai',
    'Bangalore',
    'Kolkata',
    'Chennai',
    // China
    'Beijing',
    'Shanghai',
    'Hong Kong',
    // Japan
    'Tokyo',
    'Osaka',
    // South Korea
    'Seoul',
    'Busan',
    // Southeast Asia
    'Bangkok',
    'Singapore',
    'Kuala Lumpur',
    'Jakarta',
    // Middle East
    'Dubai',
    'Abu Dhabi',
    'Doha',
    // Europe
    'London',
    'Paris',
    'Amsterdam',
    'Frankfurt',
    // North America
    'New York',
    'Los Angeles',
    'Toronto'
  ];

  const popularInternationalRoutes = [
    {
      from: 'Kathmandu',
      to: 'Dubai',
      country: 'UAE',
      price: 35999,
      duration: '4h 30m',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80',
      discount: 40
    },
    {
      from: 'Kathmandu',
      to: 'Bangkok',
      country: 'Thailand',
      price: 28999,
      duration: '3h 20m',
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=400&q=80',
      discount: 32
    },
    {
      from: 'Kathmandu',
      to: 'Singapore',
      country: 'Singapore',
      price: 42999,
      duration: '5h 15m',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=400&q=80',
      discount: 35
    },
    {
      from: 'Kathmandu',
      to: 'Delhi',
      country: 'India',
      price: 18999,
      duration: '1h 45m',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80',
      discount: 25
    },
    {
      from: 'Kathmandu',
      to: 'Tokyo',
      country: 'Japan',
      price: 65999,
      duration: '7h 30m',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80',
      discount: 30
    },
    {
      from: 'Kathmandu',
      to: 'London',
      country: 'UK',
      price: 78999,
      duration: '10h 20m',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80',
      discount: 38
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/search', { state: { formData, tripType, flightType: 'international' } });
  };

  const totalPassengers = formData.passengers.adults + formData.passengers.children + formData.passengers.infants;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1920&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <Globe className="w-5 h-5" />
              <span className="font-semibold">International Flights</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Explore the World
            </h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Book international flights to destinations across Asia, Europe, America, and beyond with exclusive deals
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
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105'
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
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105'
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
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 w-5 h-5" />
                  <select
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-semibold cursor-pointer"
                    required
                  >
                    {internationalCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* To */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">To</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                  <select
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-semibold cursor-pointer"
                    required
                  >
                    {internationalCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Departure Date */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Departure</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 w-5 h-5" />
                  <input
                    type="date"
                    value={formData.departDate}
                    onChange={(e) => setFormData({ ...formData, departDate: e.target.value })}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-semibold"
                    required
                  />
                </div>
              </div>

              {/* Return Date */}
              {tripType === 'roundtrip' && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Return</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-600 w-5 h-5" />
                    <input
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-semibold"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Passengers */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600 w-5 h-5" />
                  <div className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl font-semibold bg-white">
                    {totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-5 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Globe className="w-6 h-6" />
              Search International Flights
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>

      {/* Popular International Routes */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">Trending Destinations</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular International Routes</h2>
          <p className="text-gray-600 text-lg">Discover amazing destinations worldwide with exclusive offers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularInternationalRoutes.map((route, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => {
                setFormData({ ...formData, from: route.from, to: route.to });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={route.image}
                  alt={route.to}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {route.discount}% OFF
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white text-xl font-bold">{route.to}</h3>
                  <p className="text-white/80 text-sm">{route.country}</p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-gray-900">{route.from}</span>
                  <ArrowRight className="w-5 h-5 text-purple-600" />
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
                    <p className="text-2xl font-bold text-purple-600">रु {route.price.toLocaleString()}</p>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Destination Regions */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Destinations by Region</h2>
            <p className="text-gray-600 text-lg">Choose your next adventure from our global network</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Asia</h3>
              <p className="text-sm text-gray-600">15+ destinations</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Europe</h3>
              <p className="text-sm text-gray-600">10+ destinations</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Middle East</h3>
              <p className="text-sm text-gray-600">5+ destinations</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Americas</h3>
              <p className="text-sm text-gray-600">8+ destinations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Fly International */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose SkyWings International?</h2>
            <p className="text-purple-100 text-lg">Your trusted partner for worldwide travel</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Network</h3>
              <p className="text-purple-100">Fly to 30+ international destinations worldwide</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Service</h3>
              <p className="text-purple-100">Experience world-class comfort and hospitality</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Exclusive Deals</h3>
              <p className="text-purple-100">Save big with our international flight offers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default International;

