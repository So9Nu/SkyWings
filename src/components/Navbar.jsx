import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Menu, X, Mail, User, Calendar, HelpCircle, MessageCircle, Shield, Plane, MapPin, Globe } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [showSupportDropdown, setShowSupportDropdown] = useState(false);
  const [showFlightsDropdown, setShowFlightsDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const supportOptions = [
    { label: "Help Center", link: "/help", icon: HelpCircle },
    { label: "Contact Us", link: "/contact", icon: MessageCircle },
    { label: "FAQs", link: "/faq", icon: Mail },
  ];

  const countries = [
    { name: "Nepal", flag: "https://flagcdn.com/np.svg", code: "NPR" },
    { name: "United States", flag: "https://flagcdn.com/us.svg", code: "USD" },
    { name: "United Kingdom", flag: "https://flagcdn.com/gb.svg", code: "GBP" },
    { name: "India", flag: "https://flagcdn.com/in.svg", code: "INR" },
    { name: "Australia", flag: "https://flagcdn.com/au.svg", code: "AUD" }
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowSupportDropdown(false);
        setShowFlightsDropdown(false);
        setShowCountryDropdown(false);
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' 
        : 'bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0 z-50">
            <Logo
              size="default"
              variant={isScrolled ? 'dark' : 'light'}
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Flights Dropdown */}
            <div className="relative dropdown-container">
              <button
                className={`flex items-center gap-2 font-medium transition-all hover:scale-105 ${
                  isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-cyan-300'
                }`}
                onClick={() => {
                  setShowFlightsDropdown(!showFlightsDropdown);
                  setShowSupportDropdown(false);
                  setShowCountryDropdown(false);
                }}
              >
                <Plane className="w-5 h-5" />
                <span>Flights</span>
                <IoIosArrowDown className="w-4 h-4" />
              </button>

              {showFlightsDropdown && (
                <div className="absolute top-full mt-3 bg-white rounded-xl shadow-2xl py-2 min-w-[220px] border border-gray-100 animate-fade-in">
                  <NavLink
                    to="/domestic"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600 group"
                    onClick={() => setShowFlightsDropdown(false)}
                  >
                    <MapPin className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                    <span className="font-medium">Domestic Flights</span>
                  </NavLink>
                  <NavLink
                    to="/international"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors text-gray-700 hover:text-purple-600 group"
                    onClick={() => setShowFlightsDropdown(false)}
                  >
                    <Globe className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                    <span className="font-medium">International Flights</span>
                  </NavLink>
                </div>
              )}
            </div>

            {/* Customer Support Dropdown */}
            <div className="relative dropdown-container">
              <button
                className={`flex items-center gap-2 font-medium transition-all hover:scale-105 ${
                  isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-cyan-300'
                }`}
                onClick={() => {
                  setShowSupportDropdown(!showSupportDropdown);
                  setShowCountryDropdown(false);
                }}
              >
                <HelpCircle className="w-5 h-5" />
                <span>Support</span>
                <IoIosArrowDown className={`w-4 h-4 transition-transform duration-300 ${showSupportDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showSupportDropdown && (
                <div className="absolute top-full mt-3 bg-white rounded-xl shadow-2xl py-2 min-w-[220px] border border-gray-100 animate-fade-in">
                  {supportOptions.map((option, index) => {
                    const Icon = option.icon;
                    return (
                      <NavLink
                        key={index}
                        to={option.link}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600 group"
                        onClick={() => setShowSupportDropdown(false)}
                      >
                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        <span className="font-medium">{option.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>

            {/* My Bookings */}
            <NavLink
              to="/my-bookings"
              className={({ isActive }) => `flex items-center gap-2 font-medium transition-all hover:scale-105 ${
                isScrolled 
                  ? `${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
                  : `${isActive ? 'text-cyan-300' : 'text-white hover:text-cyan-300'}`
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>My Bookings</span>
            </NavLink>

            {/* Country Dropdown */}
            <div className="relative dropdown-container">
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all hover:scale-105 ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}
                onClick={() => {
                  setShowCountryDropdown(!showCountryDropdown);
                  setShowSupportDropdown(false);
                }}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white/50 shadow-sm">
                  <img
                    className="w-full h-full object-cover"
                    alt={selectedCountry.name}
                    src={selectedCountry.flag}
                  />
                </div>
                <span className="hidden xl:inline">{selectedCountry.code}</span>
                <IoIosArrowDown className={`w-4 h-4 transition-transform duration-300 ${showCountryDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showCountryDropdown && (
                <div className="absolute top-full mt-3 right-0 bg-white rounded-xl shadow-2xl py-2 min-w-[240px] border border-gray-100 animate-fade-in">
                  {countries.map((country, index) => (
                    <button
                      key={index}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left group ${
                        selectedCountry.name === country.name ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowCountryDropdown(false);
                      }}
                    >
                      <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-blue-400 transition-colors">
                        <img
                          className="w-full h-full object-cover"
                          alt={country.name}
                          src={country.flag}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-700 group-hover:text-blue-600">{country.name}</p>
                        <p className="text-xs text-gray-500">{country.code}</p>
                      </div>
                      {selectedCountry.name === country.name && (
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Menu - Sign In or User Dropdown */}
            {!isAuthenticated ? (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/login"
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg ${
                    isScrolled
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
                      : 'bg-white text-blue-600 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-5 h-5" />
                  <span>Sign In</span>
                </NavLink>

                {/* Admin Login Link */}
                <NavLink
                  to="/admin/login"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all hover:scale-105 border-2 ${
                    isScrolled
                      ? 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50'
                      : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                  title="Admin Login"
                >
                  <Shield className="w-4 h-4" />
                  <span className="hidden xl:inline">Admin</span>
                </NavLink>
              </div>
            ) : (
              <div className="relative dropdown-container">
                <button
                  onClick={() => {
                    setShowUserDropdown(!showUserDropdown);
                    setShowSupportDropdown(false);
                    setShowCountryDropdown(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all hover:scale-105 ${
                    isScrolled ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/20 hover:bg-white/30'
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className={`font-medium block ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                      {user?.name || 'User'}
                    </span>
                  </div>
                  <IoIosArrowDown className={`w-4 h-4 transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''} ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
                </button>

                {showUserDropdown && (
                  <div className="absolute top-full mt-3 right-0 bg-white rounded-xl shadow-2xl py-2 min-w-[220px] border border-gray-100 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                    </div>

                    <NavLink
                      to="/my-bookings"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600 group"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <Calendar className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                      <span className="font-medium">My Bookings</span>
                    </NavLink>

                    <NavLink
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600 group"
                      onClick={() => setShowUserDropdown(false)}
                    >
                      <User className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                      <span className="font-medium">Profile Settings</span>
                    </NavLink>

                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={() => {
                          logout();
                          setShowUserDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 group"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="lg:hidden mt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col gap-2 bg-white rounded-xl shadow-xl p-4">
              {/* Support Options */}
              <div className="border-b border-gray-200 pb-2 mb-2">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Support</p>
                {supportOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <NavLink
                      key={index}
                      to={option.link}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{option.label}</span>
                    </NavLink>
                  );
                })}
              </div>

              {/* My Bookings */}
              <NavLink
                to="/my-bookings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600"
                onClick={() => setShowMobileMenu(false)}
              >
                <Calendar className="w-5 h-5" />
                <span className="font-medium">My Bookings</span>
              </NavLink>

              {/* Country Selection */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Region</p>
                {countries.map((country, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-left ${
                      selectedCountry.name === country.name ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      setSelectedCountry(country);
                    }}
                  >
                    <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-gray-200">
                      <img
                        className="w-full h-full object-cover"
                        alt={country.name}
                        src={country.flag}
                      />
                    </div>
                    <span className="font-medium text-gray-700">{country.name}</span>
                    {selectedCountry.name === country.name && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-blue-600"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Sign In / User Section */}
              {!isAuthenticated ? (
                <div className="border-t border-gray-200 pt-4 mt-2 space-y-2">
                  <NavLink
                    to="/login"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Sign In</span>
                  </NavLink>

                  <NavLink
                    to="/admin/login"
                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <Shield className="w-5 h-5" />
                    <span>Admin Login</span>
                  </NavLink>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="flex items-center gap-3 px-3 py-3 bg-blue-50 rounded-lg mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                    </div>
                  </div>

                  <NavLink
                    to="/profile"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Profile Settings</span>
                  </NavLink>

                  <button
                    onClick={() => {
                      logout();
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors text-red-600 mt-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
