import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Mail, Plane, Calendar, User, CreditCard } from 'lucide-react';

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight, searchParams, passengerDetails, bookingRef, bookingDate } = location.state || {};

  if (!flight || !bookingRef) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No booking found</h2>
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

  const totalPrice = flight.price * (searchParams?.passengers?.adults + searchParams?.passengers?.children + searchParams?.passengers?.infants);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleDownloadTicket = () => {
    alert('Downloading ticket... (This would generate a PDF in a real application)');
  };

  const handleEmailTicket = () => {
    alert(`Ticket sent to ${passengerDetails.email}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 text-lg mb-4">
            Your flight has been successfully booked
          </p>
          <div className="inline-block bg-blue-50 border-2 border-blue-200 rounded-lg px-6 py-3">
            <p className="text-sm text-gray-600 mb-1">Booking Reference</p>
            <p className="text-3xl font-bold text-blue-600">{bookingRef}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            onClick={handleDownloadTicket}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            <Download className="w-5 h-5" />
            Download Ticket
          </button>
          <button
            onClick={handleEmailTicket}
            className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            <Mail className="w-5 h-5" />
            Email Ticket
          </button>
          <button
            onClick={() => navigate('/my-bookings')}
            className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 font-semibold"
          >
            View My Bookings
          </button>
        </div>

        {/* Flight Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Plane className="w-6 h-6 text-blue-600" />
            Flight Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Airline</p>
              <p className="text-lg font-semibold text-gray-900">{flight.airline}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Class</p>
              <p className="text-lg font-semibold text-gray-900">{flight.class}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">From</p>
              <p className="text-lg font-semibold text-gray-900">
                {searchParams?.from?.name} ({searchParams?.from?.code})
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">To</p>
              <p className="text-lg font-semibold text-gray-900">
                {searchParams?.to?.name} ({searchParams?.to?.code})
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Departure</p>
              <p className="text-lg font-semibold text-gray-900">{flight.departure}</p>
              <p className="text-sm text-gray-600">{formatDate(searchParams?.departureDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Arrival</p>
              <p className="text-lg font-semibold text-gray-900">{flight.arrival}</p>
              <p className="text-sm text-gray-600">{formatDate(searchParams?.departureDate)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Duration</p>
              <p className="text-lg font-semibold text-gray-900">{flight.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Stops</p>
              <p className="text-lg font-semibold text-gray-900">{flight.stops}</p>
            </div>
          </div>
        </div>

        {/* Passenger Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-blue-600" />
            Passenger Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="text-lg font-semibold text-gray-900">
                {passengerDetails.firstName} {passengerDetails.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-lg font-semibold text-gray-900">{passengerDetails.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="text-lg font-semibold text-gray-900">{passengerDetails.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Passport Number</p>
              <p className="text-lg font-semibold text-gray-900">{passengerDetails.passportNumber}</p>
            </div>
          </div>

          {passengerDetails.specialRequests && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm text-gray-500 mb-1">Special Requests</p>
              <p className="text-gray-900">{passengerDetails.specialRequests}</p>
            </div>
          )}
        </div>

        {/* Payment Summary */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-600" />
            Payment Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Base Fare ({searchParams?.passengers?.adults + searchParams?.passengers?.children + searchParams?.passengers?.infants} passenger(s))</span>
              <span>Nrs {(totalPrice * 0.85).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Taxes & Fees</span>
              <span>Nrs {(totalPrice * 0.15).toLocaleString()}</span>
            </div>
            <div className="border-t-2 pt-3 flex justify-between text-xl font-bold text-gray-900">
              <span>Total Paid</span>
              <span className="text-green-600">Nrs {totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✓ Payment successful via {passengerDetails.cardName}
            </p>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Please arrive at the airport at least 3 hours before departure</li>
            <li>• Carry a valid passport and visa (if required)</li>
            <li>• Web check-in opens 24 hours before departure</li>
            <li>• Ensure baggage complies with airline policies</li>
            <li>• Keep your booking reference handy</li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Next?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Check Your Email</p>
                <p className="text-gray-600 text-sm">
                  We've sent your e-ticket and booking confirmation to {passengerDetails.email}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Web Check-in</p>
                <p className="text-gray-600 text-sm">
                  Complete online check-in 24 hours before departure to save time
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Manage Your Booking</p>
                <p className="text-gray-600 text-sm">
                  Visit 'My Bookings' to view, modify, or cancel your reservation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;

