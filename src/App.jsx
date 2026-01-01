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
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import Domestic from './pages/Domestic'
import International from './pages/International'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        {/* Admin Routes - No Navbar/Footer */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />

        {/* Regular Routes with Navbar/Footer */}
        <Route path="*" element={
          <>
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/domestic" element={<Domestic />} />
                <Route path="/international" element={<International />} />
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
          </>
        } />
      </Routes>
    </div>
  )
}

export default App
