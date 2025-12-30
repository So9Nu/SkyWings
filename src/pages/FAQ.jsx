
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = [
    'all',
    'Booking',
    'Payment',
    'Cancellation',
    'Baggage',
    'Check-in',
    'Travel'
  ];

  const faqs = [
    {
      category: 'Booking',
      question: 'How do I book a flight?',
      answer: 'To book a flight, simply enter your departure and destination cities, select your travel dates, choose the number of passengers, and click "Search Flights". Browse through available flights, select your preferred option, and proceed to payment.'
    },
    {
      category: 'Booking',
      question: 'Can I book a flight for someone else?',
      answer: 'Yes, you can book a flight for another person. During the booking process, enter the passenger\'s details instead of your own. Make sure all information matches their government-issued ID.'
    },
    {
      category: 'Booking',
      question: 'How do I modify my booking?',
      answer: 'To modify your booking, go to "My Bookings" and select the booking you want to change. Click on "Modify Booking" and follow the instructions. Note that changes may incur additional fees depending on the fare rules.'
    },
    {
      category: 'Payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, and various online payment methods. All transactions are secured with SSL encryption.'
    },
    {
      category: 'Payment',
      question: 'Is my payment information secure?',
      answer: 'Yes, absolutely. We use industry-standard SSL encryption to protect your payment information. We never store your complete card details on our servers.'
    },
    {
      category: 'Payment',
      question: 'When will I be charged?',
      answer: 'Your payment will be processed immediately upon booking confirmation. You will receive a payment confirmation email along with your e-ticket.'
    },
    {
      category: 'Cancellation',
      question: 'What is your cancellation policy?',
      answer: 'Cancellation fees vary based on the fare type and how far in advance you cancel. Generally: 30+ days before departure: 10% fee, 15-29 days: 25% fee, 7-14 days: 50% fee, less than 7 days: no refund. Please check your specific fare rules.'
    },
    {
      category: 'Cancellation',
      question: 'How do I cancel my booking?',
      answer: 'Go to "My Bookings", select the booking you want to cancel, and click "Cancel Booking". Follow the prompts to complete the cancellation. You will receive a confirmation email once the cancellation is processed.'
    },
    {
      category: 'Cancellation',
      question: 'How long does it take to receive a refund?',
      answer: 'Refunds are typically processed within 7-10 business days after cancellation. The time it takes for the refund to appear in your account depends on your bank or payment provider.'
    },
    {
      category: 'Baggage',
      question: 'What is the baggage allowance?',
      answer: 'Economy class: 7kg cabin baggage + 30kg checked baggage. Business class: 7kg cabin baggage + 40kg checked baggage. Additional baggage can be purchased at the time of booking or at the airport.'
    },
    {
      category: 'Baggage',
      question: 'Can I add extra baggage?',
      answer: 'Yes, you can purchase additional baggage allowance during booking or by modifying your booking. It\'s more economical to add baggage before your flight rather than at the airport.'
    },
    {
      category: 'Baggage',
      question: 'What items are prohibited in baggage?',
      answer: 'Prohibited items include explosives, flammable materials, compressed gases, toxic substances, and sharp objects. Liquids in cabin baggage must be in containers of 100ml or less and placed in a clear plastic bag.'
    },
    {
      category: 'Check-in',
      question: 'When can I check in online?',
      answer: 'Online check-in opens 24 hours before your scheduled departure and closes 2 hours before departure for international flights and 1 hour for domestic flights.'
    },
    {
      category: 'Check-in',
      question: 'Do I need to print my boarding pass?',
      answer: 'You can use a digital boarding pass on your mobile device at most airports. However, we recommend having a printed copy as a backup, especially for international flights.'
    },
    {
      category: 'Check-in',
      question: 'When should I arrive at the airport?',
      answer: 'For international flights, arrive at least 3 hours before departure. For domestic flights, arrive at least 2 hours before departure. This allows time for check-in, security screening, and boarding.'
    },
    {
      category: 'Travel',
      question: 'What travel documents do I need?',
      answer: 'For international travel, you need a valid passport (valid for at least 6 months beyond your travel date) and appropriate visas. For domestic travel, a government-issued photo ID is required.'
    },
    {
      category: 'Travel',
      question: 'Can children travel alone?',
      answer: 'Children aged 5-12 can travel alone using our Unaccompanied Minor service (additional fee applies). Children under 5 must be accompanied by an adult aged 18 or older.'
    },
    {
      category: 'Travel',
      question: 'Do you offer special meals?',
      answer: 'Yes, we offer various special meal options including vegetarian, vegan, halal, kosher, and meals for dietary restrictions. Special meals must be requested at least 48 hours before departure.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about booking, payments, cancellations, and more
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600 text-lg">
                No FAQs found. Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="ml-4">
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {openFAQ === index && (
                  <div className="px-6 py-4 border-t bg-gray-50">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
          <p className="text-lg mb-6 text-blue-100">
            Our support team is here to help you 24/7
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/help"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Visit Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


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
      departureDate: '2024-02-15',
      departureTime: '08:00 AM',
      arrivalTime: '02:30 PM',
      passengers: 3,
      totalPrice: 37500,
      status: 'upcoming',
      bookingDate: '2024-01-10'
    },
    {
      id: 2,
      bookingRef: 'BK3M8N5P2Q',
      airline: 'Sky Airways',
      from: { name: 'London', code: 'LHR' },
      to: { name: 'Paris', code: 'CDG' },
      departureDate: '2024-01-20',
      departureTime: '10:30 AM',
      arrivalTime: '05:45 PM',
      passengers: 2,
      totalPrice: 19600,
      status: 'completed',
      bookingDate: '2023-12-25'
    },
    {
      id: 3,
      bookingRef: 'BK9P2Q7R4S',
      airline: 'Global Airlines',
      from: { name: 'Tokyo', code: 'NRT' },
      to: { name: 'Dubai', code: 'DXB' },
      departureDate: '2024-03-10',
      departureTime: '02:00 PM',
      arrivalTime: '09:15 PM',
      passengers: 1,
      totalPrice: 15200,
      status: 'upcoming',
      bookingDate: '2024-01-15'
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

