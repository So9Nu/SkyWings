import React from 'react';
import { HelpCircle, Book, CreditCard, Plane, Users, Shield, Phone } from 'lucide-react';

function Help() {
  const helpCategories = [
    {
      icon: Book,
      title: 'Booking & Reservations',
      description: 'Learn how to book flights, modify reservations, and manage your bookings',
      articles: 5
    },
    {
      icon: CreditCard,
      title: 'Payment & Refunds',
      description: 'Information about payment methods, refund policies, and billing',
      articles: 8
    },
    {
      icon: Plane,
      title: 'Flight Information',
      description: 'Flight schedules, baggage allowance, and travel requirements',
      articles: 12
    },
    {
      icon: Users,
      title: 'Passenger Services',
      description: 'Special assistance, meal preferences, and passenger rights',
      articles: 6
    },
    {
      icon: Shield,
      title: 'Travel Insurance',
      description: 'Coverage options, claims process, and policy details',
      articles: 4
    }
  ];

  const popularTopics = [
    'How to change my flight booking?',
    'What is the baggage allowance?',
    'How do I check-in online?',
    'What documents do I need for international travel?',
    'How can I cancel my booking?',
    'How to add special meal requests?',
    'What if my flight is delayed or cancelled?',
    'How to book for children and infants?'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How Can We Help You?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions and get support for your booking
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              className="w-full px-6 py-4 pr-12 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-600">
              <HelpCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Help Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <category.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <p className="text-sm text-blue-600 font-semibold">{category.articles} articles</p>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Topics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Topics</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularTopics.map((topic, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-start gap-3 p-3 hover:bg-blue-50 rounded-lg transition-colors group"
                >
                  <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 group-hover:text-blue-600">{topic}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow-lg p-8 text-white">
          <div className="text-center">
            <Phone className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl mb-6 text-blue-100">
              Our support team is available 24/7 to assist you
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Contact Support
              </a>
              <a
                href="#"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Live Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;

