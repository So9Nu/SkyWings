import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "./Logo";

function Navbar() {
  const [showSupportDropdown, setShowSupportDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const supportOptions = [
    { label: "Help Center", link: "/help" },
    { label: "Contact Us", link: "/contact" },
    { label: "FAQs", link: "/faq" },
  ];

  const countries = [
    { name: "Nepal", flag: "https://flagcdn.com/np.svg" },
    { name: "United States", flag: "https://flagcdn.com/us.svg" },
    { name: "United Kingdom", flag: "https://flagcdn.com/gb.svg" },
    { name: "India", flag: "https://flagcdn.com/in.svg" },
    { name: "Australia", flag: "https://flagcdn.com/au.svg" }
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`flex justify-between items-center md:px-10 md:py-7 p-7 w-full fixed top-0 left-0 z-50 backdrop-blur-sm shadow-lg transition-colors duration-300 ${
      isScrolled ? 'bg-white text-gray-900' : 'text-white'
    }`}>
      <div>
        <NavLink to="/" className="block">
          <Logo
            size="default"
            variant={isScrolled ? 'dark' : 'light'}
          />
        </NavLink>
      </div>

      <div className="md:flex hidden gap-10 text-lg items-center">
        {/* Customer Support Dropdown */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              setShowSupportDropdown(!showSupportDropdown);
              setShowCountryDropdown(false);
            }}
          >
            <p>Customer Support</p>
            <IoIosArrowDown className={`transition-transform ${showSupportDropdown ? 'rotate-180' : ''}`} />
          </div>

          {showSupportDropdown && (
            <div className="absolute top-full mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 min-w-[200px] z-50">
              {supportOptions.map((option, index) => (
                <NavLink
                  key={index}
                  to={option.link}
                  className="block px-4 py-2 hover:bg-blue-50 transition-colors"
                  onClick={() => setShowSupportDropdown(false)}
                >
                  {option.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <NavLink to="/my-bookings" className={`transition-colors ${
          isScrolled ? 'hover:text-blue-600' : 'hover:text-cyan-300'
        }`}>My Bookings</NavLink>

        {/* Country Dropdown */}
        <div className="relative">
          <div
            className="flex gap-3 items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              setShowCountryDropdown(!showCountryDropdown);
              setShowSupportDropdown(false);
            }}
          >
            <div className="rounded-full h-10 w-10 border-1 flex items-center justify-center overflow-hidden">
              <img
                className="h-5"
                alt="country-img"
                src={selectedCountry.flag}
                style={{ objectFit: "cover" }}
              />
            </div>
            <p>{selectedCountry.name}</p>
            <IoIosArrowDown className={`transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
          </div>

          {showCountryDropdown && (
            <div className="absolute top-full mt-2 bg-white text-gray-800 rounded-lg shadow-lg py-2 min-w-[200px] z-50">
              {countries.map((country, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedCountry(country);
                    setShowCountryDropdown(false);
                  }}
                >
                  <div className="rounded-full h-6 w-6 flex items-center justify-center overflow-hidden">
                    <img
                      className="h-4"
                      alt={`${country.name} flag`}
                      src={country.flag}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p>{country.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <NavLink to="/login" className={`transition-colors ${
          isScrolled ? 'hover:text-blue-600' : 'hover:text-cyan-300'
        }`}>Sign In</NavLink>
      </div>
    </header>
  );
}

export default Navbar;
