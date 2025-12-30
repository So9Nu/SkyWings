import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plane, Filter } from 'lucide-react';

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = location.state;

  const [sortBy, setSortBy] = useState('price');

  // Mock flight data
  const mockFlights = useMemo(() => [
    {
      id: 1,
      airline: 'Nepal Airlines',
      logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=100&h=100&fit=crop',
      departure: '08:00 AM',
      arrival: '02:30 PM',
      duration: '6h 30m',
      stops: 'Non-stop',
      price: 12500,
      class: 'Economy',
      seats: 12
    },
    {
      id: 2,
      airline: 'Qatar Airways',
      logo: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=100&h=100&fit=crop',
      departure: '10:30 AM',
      arrival: '05:45 PM',
      duration: '7h 15m',
      stops: '1 Stop',
      price: 9800,
      class: 'Economy',
      seats: 8
    },
    {
      id: 3,
      airline: 'Emirates',
      logo: 'https://images.unsplash.com/photo-1583094642022-3229c03f8101?w=100&h=100&fit=crop',
      departure: '02:00 PM',
      arrival: '09:15 PM',
      duration: '7h 15m',
      stops: 'Non-stop',
      price: 15200,
      class: 'Business',
      seats: 5
    },
    {
      id: 4,
      airline: 'Air India',
      logo: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=100&h=100&fit=crop',
      departure: '06:00 PM',
      arrival: '01:30 AM',
      duration: '7h 30m',
      stops: '1 Stop',
      price: 8500,
      class: 'Economy',
      seats: 15
    },
    {
      id: 5,
      airline: 'Singapore Airlines',
      logo: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=100&h=100&fit=crop',
      departure: '11:00 PM',
      arrival: '06:45 AM',
      duration: '7h 45m',
      stops: 'Non-stop',
      price: 18900,
      class: 'Business',
      seats: 3
    },
    {
      id: 6,
      airline: 'Turkish Airlines',
      logo: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=100&h=100&fit=crop',
      departure: '07:30 AM',
      arrival: '03:00 PM',
      duration: '7h 30m',
      stops: '1 Stop',
      price: 11200,
      class: 'Economy',
      seats: 10
    },
    {
      id: 7,
      airline: 'Etihad Airways',
      logo: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=100&h=100&fit=crop',
      departure: '09:15 AM',
      arrival: '04:45 PM',
      duration: '7h 30m',
      stops: 'Non-stop',
      price: 14800,
      class: 'Business',
      seats: 6
    },
    {
      id: 8,
      airline: 'Thai Airways',
      logo: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=100&h=100&fit=crop',
      departure: '01:00 PM',
      arrival: '08:30 PM',
      duration: '7h 30m',
      stops: '1 Stop',
      price: 10500,
      class: 'Economy',
      seats: 14
    },
    {
      id: 9,
      airline: 'China Southern',
      logo: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=100&h=100&fit=crop',
      departure: '05:00 AM',
      arrival: '12:30 PM',
      duration: '7h 30m',
      stops: '1 Stop',
      price: 9200,
      class: 'Economy',
      seats: 18
    },
    {
      id: 10,
      airline: 'Cathay Pacific',
      logo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop',
      departure: '03:30 PM',
      arrival: '11:00 PM',
      duration: '7h 30m',
      stops: 'Non-stop',
      price: 16500,
      class: 'Business',
      seats: 7
    }
  ], []);

  const flights = useMemo(() => {
    // Sort flights
    let sorted = [...mockFlights];
    if (sortBy === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'duration') {
      sorted.sort((a, b) => {
        const durationA = parseInt(a.duration.split('h')[0]);
        const durationB = parseInt(b.duration.split('h')[0]);
        return durationA - durationB;
      });
    } else if (sortBy === 'departure') {
      sorted.sort((a, b) => {
        const timeA = new Date(`1970/01/01 ${a.departure}`);
        const timeB = new Date(`1970/01/01 ${b.departure}`);
        return timeA - timeB;
      });
    }
    return sorted;
  }, [sortBy, mockFlights]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleSelectFlight = (flight) => {
    navigate(`/flight/${flight.id}`, { state: { flight, searchParams } });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Search Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {searchParams?.from?.name} → {searchParams?.to?.name}
                </h2>
                <p className="text-gray-600">
                  {searchParams?.departureDate && formatDate(searchParams.departureDate)}
                  {searchParams?.returnDate && ` - ${formatDate(searchParams.returnDate)}`}
                  {' • '}
                  {searchParams?.passengers?.adults + searchParams?.passengers?.children + searchParams?.passengers?.infants} Passenger(s)
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Modify Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <Filter className="w-5 h-5 text-gray-600" />
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="price">Price (Low to High)</option>
                  <option value="duration">Duration</option>
                  <option value="departure">Departure Time</option>
                </select>
              </div>

              {/* Stops Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stops
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rounded" />
                    <span className="text-sm text-gray-700">Non-stop</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rounded" />
                    <span className="text-sm text-gray-700">1 Stop</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2 rounded" />
                    <span className="text-sm text-gray-700">2+ Stops</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range
                </label>
                <input
                  type="range"
                  min="0"
                  max="20000"
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>Nrs 0</span>
                  <span>Nrs 20,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flight Results */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <p className="text-gray-600">
                Showing <span className="font-semibold">{flights.length}</span> flights
              </p>
            </div>

            <div className="space-y-4">
              {flights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {/* Airline Info */}
                      <div className="flex items-center gap-4">
                        <img
                          src={flight.logo}
                          alt={flight.airline}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{flight.airline}</p>
                          <p className="text-sm text-gray-500">{flight.class}</p>
                        </div>
                      </div>

                      {/* Flight Times */}
                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{flight.departure}</p>
                            <p className="text-sm text-gray-500">{searchParams?.from?.code}</p>
                          </div>

                          <div className="flex-1 px-4">
                            <div className="flex items-center justify-center mb-1">
                              <Plane className="w-5 h-5 text-blue-600 rotate-90" />
                            </div>
                            <div className="border-t-2 border-gray-300 relative">
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white px-2">
                                <p className="text-xs text-gray-500 whitespace-nowrap">{flight.duration}</p>
                              </div>
                            </div>
                            <p className="text-xs text-center text-gray-500 mt-1">{flight.stops}</p>
                          </div>

                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{flight.arrival}</p>
                            <p className="text-sm text-gray-500">{searchParams?.to?.code}</p>
                          </div>
                        </div>
                      </div>

                      {/* Price & Book */}
                      <div className="flex flex-col justify-center items-end gap-2">
                        <div className="text-right">
                          <p className="text-3xl font-bold text-blue-600">Nrs {flight.price.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">{flight.seats} seats left</p>
                        </div>
                        <button
                          onClick={() => handleSelectFlight(flight)}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
