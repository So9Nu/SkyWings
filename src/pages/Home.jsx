import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, MapPin, ArrowRight, Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import Offers from "../components/Offers";
import DealCard from "../components/DealCard";
import ReviewCard from "../components/ReviewCard";
import OfferCard from "../components/OfferCard";

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Calendar Component
const CalendarComponent = ({ selectedDate, onSelectDate, minDate, currentMonth, setCurrentMonth }) => {
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isSelected = (day) => {
    return selectedDate.getDate() === day &&
           selectedDate.getMonth() === month &&
           selectedDate.getFullYear() === year;
  };

  const isDisabled = (day) => {
    if (!minDate) return false;
    const date = new Date(year, month, day);
    return date < minDate;
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-semibold">{monthNames[month]} {year}</h3>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}

        {Array.from({ length: startingDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const disabled = isDisabled(day);
          const selected = isSelected(day);

          return (
            <button
              key={day}
              onClick={() => !disabled && onSelectDate(new Date(year, month, day))}
              disabled={disabled}
              className={`
                p-2 text-center rounded-lg transition-all
                ${selected ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-gray-100'}
                ${disabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

function Home() {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState("roundtrip");
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [showDepartureModal, setShowDepartureModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [citySearchFrom, setCitySearchFrom] = useState("");
  const [citySearchTo, setCitySearchTo] = useState("");

  const [fromCity, setFromCity] = useState({ name: "Kathmandu", code: "KTM", country: "Nepal" });
  const [toCity, setToCity] = useState({ name: "New York", code: "JFK", country: "United States" });
  const [departureDate, setDepartureDate] = useState(new Date(2023, 9, 20));
  const [returnDate, setReturnDate] = useState(new Date(2023, 9, 23));
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 9, 1));
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 2,
    infants: 0
  });

  const cities = [
    // Nepal
    { name: "Kathmandu", code: "KTM", country: "Nepal" },
    { name: "Pokhara", code: "PKR", country: "Nepal" },

    // India
    { name: "Delhi", code: "DEL", country: "India" },
    { name: "Mumbai", code: "BOM", country: "India" },
    { name: "Bangalore", code: "BLR", country: "India" },
    { name: "Kolkata", code: "CCU", country: "India" },
    { name: "Chennai", code: "MAA", country: "India" },
    { name: "Hyderabad", code: "HYD", country: "India" },

    // China
    { name: "Beijing", code: "PEK", country: "China" },
    { name: "Shanghai", code: "PVG", country: "China" },
    { name: "Guangzhou", code: "CAN", country: "China" },
    { name: "Hong Kong", code: "HKG", country: "Hong Kong" },

    // Japan
    { name: "Tokyo", code: "NRT", country: "Japan" },
    { name: "Osaka", code: "KIX", country: "Japan" },
    { name: "Kyoto", code: "UKY", country: "Japan" },

    // South Korea
    { name: "Seoul", code: "ICN", country: "South Korea" },
    { name: "Busan", code: "PUS", country: "South Korea" },

    // Switzerland
    { name: "Zurich", code: "ZRH", country: "Switzerland" },
    { name: "Geneva", code: "GVA", country: "Switzerland" },

    // Southeast Asia
    { name: "Bangkok", code: "BKK", country: "Thailand" },
    { name: "Singapore", code: "SIN", country: "Singapore" },
    { name: "Kuala Lumpur", code: "KUL", country: "Malaysia" },
    { name: "Jakarta", code: "CGK", country: "Indonesia" },
    { name: "Manila", code: "MNL", country: "Philippines" },
    { name: "Hanoi", code: "HAN", country: "Vietnam" },

    // Middle East
    { name: "Dubai", code: "DXB", country: "United Arab Emirates" },
    { name: "Abu Dhabi", code: "AUH", country: "United Arab Emirates" },
    { name: "Doha", code: "DOH", country: "Qatar" },
    { name: "Riyadh", code: "RUH", country: "Saudi Arabia" },

    // Europe
    { name: "London", code: "LHR", country: "United Kingdom" },
    { name: "Paris", code: "CDG", country: "France" },
    { name: "Amsterdam", code: "AMS", country: "Netherlands" },
    { name: "Frankfurt", code: "FRA", country: "Germany" },
    { name: "Rome", code: "FCO", country: "Italy" },
    { name: "Madrid", code: "MAD", country: "Spain" },
    { name: "Istanbul", code: "IST", country: "Turkey" },

    // North America
    { name: "New York", code: "JFK", country: "United States" },
    { name: "Los Angeles", code: "LAX", country: "United States" },
    { name: "San Francisco", code: "SFO", country: "United States" },
    { name: "Chicago", code: "ORD", country: "United States" },
    { name: "Toronto", code: "YYZ", country: "Canada" },
    { name: "Vancouver", code: "YVR", country: "Canada" },

    // Oceania
    { name: "Sydney", code: "SYD", country: "Australia" },
    { name: "Melbourne", code: "MEL", country: "Australia" },
    { name: "Auckland", code: "AKL", country: "New Zealand" },

    // South Asia
    { name: "Dhaka", code: "DAC", country: "Bangladesh" },
    { name: "Colombo", code: "CMB", country: "Sri Lanka" },
    { name: "Islamabad", code: "ISB", country: "Pakistan" },
    { name: "Karachi", code: "KHI", country: "Pakistan" },

    // Africa
    { name: "Cairo", code: "CAI", country: "Egypt" },
    { name: "Nairobi", code: "NBO", country: "Kenya" },
    { name: "Johannesburg", code: "JNB", country: "South Africa" },
  ];

  const formatDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
  };

  const handleSearch = () => {
    const searchParams = {
      from: fromCity,
      to: toCity,
      departureDate: departureDate.toISOString(),
      returnDate: tripType === "roundtrip" ? returnDate.toISOString() : null,
      passengers,
      tripType
    };

    navigate('/search', { state: searchParams });
  };

  // Filter cities based on search
  const filteredCitiesFrom = cities.filter(city =>
    city.name.toLowerCase().includes(citySearchFrom.toLowerCase()) ||
    city.code.toLowerCase().includes(citySearchFrom.toLowerCase()) ||
    city.country.toLowerCase().includes(citySearchFrom.toLowerCase())
  );

  const filteredCitiesTo = cities.filter(city =>
    city.name.toLowerCase().includes(citySearchTo.toLowerCase()) ||
    city.code.toLowerCase().includes(citySearchTo.toLowerCase()) ||
    city.country.toLowerCase().includes(citySearchTo.toLowerCase())
  );

  return (
      <>
          <section className="relative min-h-screen">
              {/* Hero Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600">
                  <img
                      src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80"
                      alt="Airplane in sky"
                      className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
                  <div className="text-center mb-8 animate-fade-in">
                      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                          Discover Your Next Adventure
                      </h1>
                      <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                          Search and compare flights to destinations worldwide
                      </p>
                  </div>

                  {/* Search Card */}
                  <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-sm">
                      {/* Trip Type Selector */}
                      <div className="flex flex-wrap gap-4 mb-6">
                          <button
                              onClick={() => setTripType("roundtrip")}
                              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                  tripType === "roundtrip"
                                      ? "bg-blue-600 text-white shadow-md"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                          >
                              Round Trip
                          </button>
                          <button
                              onClick={() => setTripType("oneway")}
                              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                  tripType === "oneway"
                                      ? "bg-blue-600 text-white shadow-md"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                          >
                              One Way
                          </button>
                      </div>

                      {/* Search Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                          {/* From */}
                          <div className="lg:col-span-1">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                  From
                              </label>
                              <div
                                  onClick={() => setShowFromModal(true)}
                                  className="relative bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer group"
                              >
                                  <MapPin className="absolute top-4 right-4 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                  <div className="pr-8">
                                      <p className="font-semibold text-gray-900 text-lg">{fromCity.name}</p>
                                      <p className="text-sm text-gray-500">{fromCity.code}, {fromCity.country}</p>
                                  </div>
                              </div>
                          </div>

                          {/* Arrow Icon - Hidden on mobile */}
                          <div className="hidden lg:flex items-end justify-center pb-4">
                              <ArrowRight className="w-6 h-6 text-blue-600" />
                          </div>

                          {/* To */}
                          <div className="lg:col-span-1">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                  To
                              </label>
                              <div
                                  onClick={() => setShowToModal(true)}
                                  className="relative bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer group"
                              >
                                  <MapPin className="absolute top-4 right-4 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                  <div className="pr-8">
                                      <p className="font-semibold text-gray-900 text-lg">{toCity.name}</p>
                                      <p className="text-sm text-gray-500">{toCity.code}, {toCity.country}</p>
                                  </div>
                              </div>
                          </div>

                          {/* Departure */}
                          <div className="lg:col-span-1">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Departure
                              </label>
                              <div
                                  onClick={() => setShowDepartureModal(true)}
                                  className="relative bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer group"
                              >
                                  <Calendar className="absolute top-4 right-4 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                  <div className="pr-8">
                                      <p className="font-semibold text-gray-900">{formatDate(departureDate)}</p>
                                      <p className="text-sm text-gray-500">{departureDate.getFullYear()}</p>
                                  </div>
                              </div>
                          </div>

                          {/* Return */}
                          {tripType === "roundtrip" && (
                              <div className="lg:col-span-1">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Return
                                  </label>
                                  <div
                                      onClick={() => setShowReturnModal(true)}
                                      className="relative bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer group"
                                  >
                                      <Calendar className="absolute top-4 right-4 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                      <div className="pr-8">
                                          <p className="font-semibold text-gray-900">{formatDate(returnDate)}</p>
                                          <p className="text-sm text-gray-500">{returnDate.getFullYear()}</p>
                                      </div>
                                  </div>
                              </div>
                          )}

                          {/* Passengers */}
                          <div className={tripType === "roundtrip" ? "lg:col-span-1" : "lg:col-span-2"}>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Passengers
                              </label>
                              <div
                                  onClick={() => setShowPassengerModal(true)}
                                  className="relative bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors cursor-pointer group"
                              >
                                  <Users className="absolute top-4 right-4 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                  <div className="pr-8">
                                      <p className="font-semibold text-gray-900">
                                          {passengers.adults + passengers.children + passengers.infants} Passenger{passengers.adults + passengers.children + passengers.infants !== 1 ? 's' : ''}
                                      </p>
                                      <p className="text-sm text-gray-500">
                                          {passengers.adults > 0 && `${passengers.adults} Adult${passengers.adults !== 1 ? 's' : ''}`}
                                          {passengers.children > 0 && `, ${passengers.children} Child${passengers.children !== 1 ? 'ren' : ''}`}
                                          {passengers.infants > 0 && `, ${passengers.infants} Infant${passengers.infants !== 1 ? 's' : ''}`}
                                      </p>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Search Button */}
                      <button
                        onClick={handleSearch}
                        className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-12 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group">
                          <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          Search Flights
                      </button>
                  </div>

                  {/* Popular Destinations */}
                  <div className="mt-12 text-center">
                      <p className="text-white/80 text-sm mb-4">Popular destinations:</p>
                      <div className="flex flex-wrap justify-center gap-3">
                          {["London", "Paris", "Tokyo", "Dubai", "Singapore"].map((city) => (
                              <span
                                  key={city}
                                  className="px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm hover:bg-white/20 transition-colors cursor-pointer"
                              >
                {city}
              </span>
                          ))}
                      </div>
                  </div>
              </div>

              {/* From City Modal */}
              <Modal isOpen={showFromModal} onClose={() => setShowFromModal(false)} title="Select Departure City">
                  <div className="p-6">
                      <div className="mb-4">
                          <input
                              type="text"
                              placeholder="Search city or airport"
                              value={citySearchFrom}
                              onChange={(e) => setCitySearchFrom(e.target.value)}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredCitiesFrom.map((city) => (
                              <div
                                  key={city.code}
                                  onClick={() => {
                                      setFromCity(city);
                                      setShowFromModal(false);
                                  }}
                                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all group"
                              >
                                  <div className="flex items-center gap-3">
                                      <MapPin className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                                      <div>
                                          <p className="font-semibold text-gray-900">{city.name}</p>
                                          <p className="text-sm text-gray-500">{city.code}, {city.country}</p>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </Modal>

              {/* To City Modal */}
              <Modal isOpen={showToModal} onClose={() => setShowToModal(false)} title="Select Destination City">
                  <div className="p-6">
                      <div className="mb-4">
                          <input
                              type="text"
                              placeholder="Search city or airport"
                              value={citySearchTo}
                              onChange={(e) => setCitySearchTo(e.target.value)}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredCitiesTo.map((city) => (
                              <div
                                  key={city.code}
                                  onClick={() => {
                                      setToCity(city);
                                      setShowToModal(false);
                                  }}
                                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all group"
                              >
                                  <div className="flex items-center gap-3">
                                      <MapPin className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                                      <div>
                                          <p className="font-semibold text-gray-900">{city.name}</p>
                                          <p className="text-sm text-gray-500">{city.code}, {city.country}</p>
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </Modal>

              {/* Departure Date Modal */}
              <Modal isOpen={showDepartureModal} onClose={() => setShowDepartureModal(false)} title="Select Departure Date">
                  <CalendarComponent
                      selectedDate={departureDate}
                      onSelectDate={(date) => {
                          setDepartureDate(date);
                          if (date > returnDate) {
                              setReturnDate(new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000));
                          }
                          setShowDepartureModal(false);
                      }}
                      currentMonth={currentMonth}
                      setCurrentMonth={setCurrentMonth}
                  />
              </Modal>

              {/* Return Date Modal */}
              <Modal isOpen={showReturnModal} onClose={() => setShowReturnModal(false)} title="Select Return Date">
                  <CalendarComponent
                      selectedDate={returnDate}
                      onSelectDate={(date) => {
                          setReturnDate(date);
                          setShowReturnModal(false);
                      }}
                      minDate={departureDate}
                      currentMonth={currentMonth}
                      setCurrentMonth={setCurrentMonth}
                  />
              </Modal>

              {/* Passenger Modal */}
              <Modal isOpen={showPassengerModal} onClose={() => setShowPassengerModal(false)} title="Select Passengers">
                  <div className="p-6">
                      <div className="grid grid-cols-1 gap-4">
                          {/* Adults */}
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Adults
                              </label>
                              <div className="flex items-center gap-2">
                                  <button
                                      onClick={() => setPassengers({ ...passengers, adults: Math.max(1, passengers.adults - 1) })}
                                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                  >
                                      -
                                  </button>
                                  <span className="text-lg font-semibold text-gray-900">
                  {passengers.adults}
                </span>
                                  <button
                                      onClick={() => setPassengers({ ...passengers, adults: passengers.adults + 1 })}
                                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                  >
                                      +
                                  </button>
                              </div>
                          </div>

                          {/* Children */}
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Children
                              </label>
                              <div className="flex items-center gap-2">
                                  <button
                                      onClick={() => setPassengers({ ...passengers, children: Math.max(0, passengers.children - 1) })}
                                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                  >
                                      -
                                  </button>
                                  <span className="text-lg font-semibold text-gray-900">
                  {passengers.children}
                </span>
                                  <button
                                      onClick={() => setPassengers({ ...passengers, children: passengers.children + 1 })}
                                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                  >
                                      +
                                  </button>
                              </div>
                          </div>

                          {/* Infants */}
                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Infants
                              </label>
                              <div className="flex items-center gap-2">
                                  <button
                                      onClick={() => setPassengers({ ...passengers, infants: Math.max(0, passengers.infants - 1) })}
                                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                  >
                                      -
                                  </button>
                                  <span className="text-lg font-semibold text-gray-900">
                  {passengers.infants}
                </span>
                                  <button
                                      onClick={() => setPassengers({ ...passengers, infants: passengers.infants + 1 })}
                                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                  >
                                      +
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </Modal>




          </section>

          {/* Top Deals for Today Section */}
          <section className=" bg-gray-100 py-12">
              <div className="md:w-[90%] md:mx-auto px-2">
                  <div className="flex justify-between items-center my-8">
                      <h3 className="text-2xl font-bold text-gray-900">Top Deals for Today</h3>
                      <button className="text-gray-500 bg-white rounded-lg px-5 py-2 cursor-pointer hover:bg-blue-600 hover:text-white transition-all delay-100 shadow-sm">
                          View all
                      </button>
                  </div>
                  <div className="flex gap-6 overflow-x-scroll scrollbar-hide pb-10">
                      <DealCard
                        image="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"
                        destination="Taj Mahal, India"
                        rating="4.8/5"
                        reviews="520 Reviews"
                        price={1250}
                      />
                      <DealCard
                        image="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80"
                        destination="Great Wall, China"
                        rating="4.9/5"
                        reviews="680 Reviews"
                        price={2100}
                      />
                      <DealCard
                        image="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80"
                        destination="Swiss Alps, Switzerland"
                        rating="5/5"
                        reviews="420 Reviews"
                        price={3200}
                      />
                      <DealCard
                        image="https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&q=80"
                        destination="Seoul Tower, South Korea"
                        rating="4.7/5"
                        reviews="390 Reviews"
                        price={1850}
                      />
                      <DealCard
                        image="https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80"
                        destination="Alhambra, Spain"
                        rating="4.5/5"
                        reviews="250 Reviews"
                        price={1800}
                      />
                      <DealCard
                        image="https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=80"
                        destination="Pyramids of Giza, Egypt"
                        rating="4.2/5"
                        reviews="110 Reviews"
                        price={1863}
                      />
                      <DealCard
                        image="https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80"
                        destination="Petra, Jordan"
                        rating="3.5/5"
                        reviews="180 Reviews"
                        price={2593}
                      />
                      <DealCard
                        image="https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&w=800&q=80"
                        destination="Colosseum, Italy"
                        rating="5/5"
                        reviews="240 Reviews"
                        price={3950}
                      />
                  </div>
              </div>
          </section>

          {/* Special Offers Section */}
          <section className="py-12">

              <div className="md:w-[90%] md:mx-auto px-2 ">
                   <div className="flex justify-between items-center my-8 ">
                      <div>
                          <h3 className="text-2xl font-bold text-gray-900">Special Offers</h3>
                          <p className="text-gray-600">Limited time deals on popular destinations</p>
                      </div>
                      <button className="text-gray-500 bg-gray-100 rounded-lg px-5 py-2 cursor-pointer hover:bg-blue-600 hover:text-white transition-all delay-100 shadow-sm" >View all</button>
                  </div>
                  <div className="flex gap-6 overflow-x-scroll scrollbar-hide pb-10">
                      <OfferCard
                        image="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"
                        destination="Mumbai, India"
                        discount={40}
                        price={249}
                        validTill="Jan 20, 2026"
                      />
                      <OfferCard
                        image="https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80"
                        destination="Beijing, China"
                        discount={35}
                        price={349}
                        validTill="Feb 10, 2026"
                      />
                      <OfferCard
                        image="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80"
                        destination="Zurich, Switzerland"
                        discount={30}
                        price={599}
                        validTill="Jan 25, 2026"
                      />
                      <OfferCard
                        image="https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&w=800&q=80"
                        destination="Seoul, South Korea"
                        discount={38}
                        price={329}
                        validTill="Feb 5, 2026"
                      />
                      <OfferCard
                        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
                        destination="Melbourne"
                        discount={30}
                        price={199}
                        validTill="Dec 31, 2025"
                      />
                      <OfferCard
                        image="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80"
                        destination="London"
                        discount={25}
                        price={399}
                        validTill="Jan 15, 2026"
                      />
                      <OfferCard
                        image="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
                        destination="New York"
                        discount={35}
                        price={299}
                        validTill="Dec 25, 2025"
                      />
                      <OfferCard
                        image="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80"
                        destination="Tokyo"
                        discount={20}
                        price={499}
                        validTill="Jan 10, 2026"
                      />
                  </div>
              </div>
          </section>

          {/* Customer Reviews Section */}
          <section className="bg-gray-100 py-12">
              <div className="md:w-[90%] md:mx-auto px-2">
                  <div className="flex justify-between items-center my-8">
                      <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">Customer Reviews</h3>
                          <p className="text-gray-600">What our travelers say about us</p>
                      </div>
                      <button className="text-gray-500 bg-white rounded-lg px-5 py-2 cursor-pointer hover:bg-blue-600 hover:text-white transition-all delay-100 shadow-sm">
                          View all
                      </button>
                  </div>
                  <div className="flex gap-6 overflow-x-scroll scrollbar-hide pb-10">
                      <ReviewCard
                        name="Rajesh Thapa"
                        image="https://randomuser.me/api/portraits/men/65.jpg"
                        rating={5}
                        review="Absolutely wonderful service! Booked my flight from Kathmandu to Dubai and everything went perfectly. The prices were competitive and customer support was excellent. Dhanyabad!"
                        date="December 28, 2024"
                        location="Kathmandu, Nepal"
                      />
                      <ReviewCard
                        name="Priya Sharma"
                        image="https://randomuser.me/api/portraits/women/90.jpg"
                        rating={4.5}
                        review="Excellent platform for booking international flights. The customer service team helped me modify my booking without any hassle. Highly professional!"
                        date="December 20, 2024"
                        location="Mumbai, India"
                      />
                      <ReviewCard
                        name="Wei Zhang"
                        image="https://randomuser.me/api/portraits/men/71.jpg"
                        rating={5}
                        review="很好! Great deals on flights to Europe. The booking system is easy to use and I received instant confirmation. Will definitely recommend to my friends and family."
                        date="December 18, 2024"
                        location="Beijing, China"
                      />
                      <ReviewCard
                        name="Kim Min-jun"
                        image="https://randomuser.me/api/portraits/men/85.jpg"
                        rating={4.8}
                        review="훌륭해요! Found amazing flight deals to Switzerland. The website is very user-friendly and payment was secure. Customer service responded quickly to my questions."
                        date="December 15, 2024"
                        location="Seoul, South Korea"
                      />
                      <ReviewCard
                        name="Maya Gurung"
                        image="https://randomuser.me/api/portraits/women/55.jpg"
                        rating={5}
                        review="Best flight booking experience! Booked my family trip to India with ease. The prices were unbeatable and the process was straightforward. Highly recommended!"
                        date="December 12, 2024"
                        location="Pokhara, Nepal"
                      />
                      <ReviewCard
                        name="Arjun Patel"
                        image="https://randomuser.me/api/portraits/men/42.jpg"
                        rating={4.7}
                        review="Fantastic service! Got great deals on my flight to London. The booking process was smooth and I appreciated the 24/7 customer support. Will use again!"
                        date="December 10, 2024"
                        location="Delhi, India"
                      />
                      <ReviewCard
                        name="Sophie Müller"
                        image="https://randomuser.me/api/portraits/women/78.jpg"
                        rating={5}
                        review="Ausgezeichnet! Amazing platform for international travel. Booked flights to Asia with excellent prices. The interface is clean and easy to navigate. Highly satisfied!"
                        date="December 8, 2024"
                        location="Zurich, Switzerland"
                      />
                      <ReviewCard
                        name="Li Mei"
                        image="https://randomuser.me/api/portraits/women/82.jpg"
                        rating={4.6}
                        review="非常好! Very impressed with the service quality. Found affordable flights to South Korea and the customer support team was very helpful throughout the process."
                        date="December 5, 2024"
                        location="Shanghai, China"
                      />
                      <ReviewCard
                        name="Sarah Johnson"
                        image="https://randomuser.me/api/portraits/women/44.jpg"
                        rating={5}
                        review="Amazing experience! The booking process was smooth and the flight was comfortable. Highly recommend this service for anyone looking to travel hassle-free."
                        date="December 2, 2024"
                        location="New York, USA"
                      />
                      <ReviewCard
                        name="Amit Kumar"
                        image="https://randomuser.me/api/portraits/men/56.jpg"
                        rating={4.9}
                        review="Outstanding service! Booked multiple flights for business trips and always received the best rates. The mobile-friendly website makes booking on-the-go very easy."
                        date="November 28, 2024"
                        location="Bangalore, India"
                      />
                      <ReviewCard
                        name="Emma Williams"
                        image="https://randomuser.me/api/portraits/women/68.jpg"
                        rating={5}
                        review="Best flight booking platform I've used! The interface is intuitive and I found great deals. The entire process from search to confirmation was seamless."
                        date="November 25, 2024"
                        location="London, UK"
                      />
                      <ReviewCard
                        name="Park Ji-woo"
                        image="https://randomuser.me/api/portraits/women/72.jpg"
                        rating={4.8}
                        review="정말 좋아요! Excellent service for international bookings. The flight options were diverse and prices were very competitive. Customer support was quick to respond."
                        date="November 20, 2024"
                        location="Busan, South Korea"
                      />
                  </div>
              </div>
          </section>
      </>

  );
}

export default Home;
