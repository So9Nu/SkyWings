import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Calendar, MapPin, Download, X, Search } from 'lucide-react';

function MyBookings() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock bookings data
  const mockBookings = [
    {
      id: 1,
      bookingRef: 'BK7X9K2M1P',
      airline: 'Air Nepal',
      from: { name: 'Dhaka', code: 'DAC' },
      to: { name: 'New York', code: 'JFK' },
      departureDate: '2025-02-15',
      departureTime: '08:00 AM',
      arrivalTime: '02:30 PM',
      passengers: 3,
      totalPrice: 37500,
      status: 'upcoming',
      bookingDate: '2025-01-10'
    },
    {
      id: 2,
      bookingRef: 'BK3M8N5P2Q',
      airline: 'Sky Airways',
      from: { name: 'London', code: 'LHR' },
      to: { name: 'Paris', code: 'CDG' },
      departureDate: '2025-01-20',
      departureTime: '10:30 AM',
      arrivalTime: '05:45 PM',
      passengers: 2,
      totalPrice: 19600,
      status: 'completed',
      bookingDate: '2024-12-25'
    },
    {
      id: 3,
      bookingRef: 'BK9P2Q7R4S',
      airline: 'Global Airlines',
      from: { name: 'Tokyo', code: 'NRT' },
      to: { name: 'Dubai', code: 'DXB' },
      departureDate: '2025-03-10',
      departureTime: '02:00 PM',
      arrivalTime: '09:15 PM',
      passengers: 1,
      totalPrice: 15200,
      status: 'upcoming',
      bookingDate: '2025-01-15'
    }
  ];

  const [bookings, setBookings] = useState(mockBookings);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.to.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
        )
      );
      alert('Booking cancelled successfully');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">View and manage your flight reservations</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by booking reference or destination..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Bookings</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'You haven\'t made any bookings yet'}
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book a Flight
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        booking.status === 'upcoming' ? 'bg-green-100 text-green-800' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Booking Reference</p>
                        <p className="font-bold text-gray-900">{booking.bookingRef}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">Nrs {booking.totalPrice.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{booking.passengers} passenger(s)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Airline</p>
                      <p className="font-semibold text-gray-900">{booking.airline}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">From - To</p>
                      <p className="font-semibold text-gray-900">
                        {booking.from.name} ({booking.from.code}) → {booking.to.name} ({booking.to.code})
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">Departure</p>
                      <p className="font-semibold text-gray-900">{formatDate(booking.departureDate)}</p>
                      <p className="text-sm text-gray-600">{booking.departureTime} - {booking.arrivalTime}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Ticket
                    </button>

                    {booking.status === 'upcoming' && (
                      <>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          Web Check-in
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Modify Booking
                        </button>
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Cancel Booking
                        </button>
                      </>
                    )}

                    {booking.status === 'completed' && (
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Book Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;

