import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Plane, Clock, Calendar, Users, Briefcase, Coffee, Wifi, CheckCircle } from 'lucide-react';

function FlightDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, searchParams } = location.state || {};

  if (!flight) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Flight not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const amenities = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Coffee, label: 'Complimentary Snacks' },
    { icon: Briefcase, label: '30kg Baggage' },
    { icon: Users, label: 'Extra Legroom' }
  ];

  const handleProceedToBooking = () => {
    navigate('/booking', { state: { flight, searchParams } });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
        >
          ← Back to Results
        </button>

        {/* Flight Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <img
                src={flight.logo}
                alt={flight.airline}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{flight.airline}</h1>
                <p className="text-gray-600">{flight.class} Class</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-blue-600">Nrs {flight.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500">per person</p>
            </div>
          </div>

          {/* Flight Route */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Departure</p>
              <p className="text-3xl font-bold text-gray-900">{flight.departure}</p>
              <p className="text-xl font-semibold text-gray-700 mt-2">{searchParams?.from?.name}</p>
              <p className="text-gray-500">{searchParams?.from?.code}</p>
              {searchParams?.departureDate && (
                <p className="text-sm text-gray-500 mt-2">{formatDate(searchParams.departureDate)}</p>
              )}
            </div>

            <div className="flex flex-col items-center justify-center">
              <Plane className="w-8 h-8 text-blue-600 rotate-90 mb-2" />
              <p className="text-lg font-semibold text-gray-700">{flight.duration}</p>
              <div className="w-full border-t-2 border-blue-300 my-2"></div>
              <p className="text-sm text-gray-500">{flight.stops}</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Arrival</p>
              <p className="text-3xl font-bold text-gray-900">{flight.arrival}</p>
              <p className="text-xl font-semibold text-gray-700 mt-2">{searchParams?.to?.name}</p>
              <p className="text-gray-500">{searchParams?.to?.code}</p>
              {searchParams?.departureDate && (
                <p className="text-sm text-gray-500 mt-2">{formatDate(searchParams.departureDate)}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-orange-600 bg-orange-50 rounded-lg p-3">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Only {flight.seats} seats remaining at this price!</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Flight Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <amenity.icon className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-700 font-medium">{amenity.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Baggage Policy */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Baggage Policy</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Cabin Baggage</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">1 piece up to 7kg</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Max dimensions: 55 x 40 x 20 cm</span>
                </li>
              </ul>
            </div>
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Checked Baggage</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">2 pieces up to 30kg total</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Additional baggage available for purchase</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
          <div className="space-y-3 text-gray-700">
            <p>• Cancellation made 30+ days before departure: 10% fee</p>
            <p>• Cancellation made 15-29 days before departure: 25% fee</p>
            <p>• Cancellation made 7-14 days before departure: 50% fee</p>
            <p>• Cancellation made less than 7 days before departure: No refund</p>
          </div>
        </div>

        {/* Passenger Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Passenger Information</h2>
          <div className="flex items-center gap-3 text-gray-700">
            <Users className="w-6 h-6 text-blue-600" />
            <span className="text-lg">
              {searchParams?.passengers?.adults} Adult(s)
              {searchParams?.passengers?.children > 0 && `, ${searchParams?.passengers?.children} Child(ren)`}
              {searchParams?.passengers?.infants > 0 && `, ${searchParams?.passengers?.infants} Infant(s)`}
            </span>
          </div>
        </div>

        {/* Total Price */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow-lg p-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-2">Total Price</h3>
              <p className="text-blue-100">
                For {searchParams?.passengers?.adults + searchParams?.passengers?.children + searchParams?.passengers?.infants} passenger(s)
              </p>
            </div>
            <div className="text-right">
              <p className="text-5xl font-bold">
                Nrs {(flight.price * (searchParams?.passengers?.adults + searchParams?.passengers?.children + searchParams?.passengers?.infants)).toLocaleString()}
              </p>
              <p className="text-blue-100 text-sm mt-1">Taxes included</p>
            </div>
          </div>
          <button
            onClick={handleProceedToBooking}
            className="w-full bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-blue-50 transition-colors text-lg"
          >
            Proceed to Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default FlightDetails;

