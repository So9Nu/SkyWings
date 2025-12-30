import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import FlightDetails from './pages/FlightDetails'
import Booking from './pages/Booking'
import Confirmation from './pages/Confirmation'
import Login from './pages/Login'
import Register from './pages/Register'
import MyBookings from './pages/MyBookings'
import Help from './pages/Help'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/flight/:id" element={<FlightDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
