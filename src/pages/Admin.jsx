import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plane,
  DollarSign,
  CheckCircle,
  Clock,
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  LogOut,
  Download,
  RefreshCw,
  Calendar,
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  BarChart3,
  Users
} from 'lucide-react';
import { bookingsAPI, statsAPI } from '../services/api';
import Logo from '../components/Logo';

function Admin() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [formData, setFormData] = useState({
    passengerName: '',
    email: '',
    phone: '',
    from: '',
    to: '',
    date: '',
    flightNumber: '',
    class: 'Economy',
    passengers: 1,
    totalPrice: 0,
    status: 'Confirmed'
  });

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [navigate]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filterStatus, bookings]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [bookingsResult, statsResult] = await Promise.all([
        bookingsAPI.getAll(),
        statsAPI.getStats()
      ]);

      if (bookingsResult.success) {
        setBookings(bookingsResult.data);
      }
      if (statsResult.success) {
        setStats(statsResult.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...bookings];

    if (filterStatus !== 'All') {
      filtered = filtered.filter(b => b.status === filterStatus);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(booking =>
        booking.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.passengerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.phone.includes(searchQuery)
      );
    }

    setFilteredBookings(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const openAddModal = () => {
    setModalMode('add');
    setFormData({
      passengerName: '',
      email: '',
      phone: '',
      from: '',
      to: '',
      date: '',
      flightNumber: '',
      class: 'Economy',
      passengers: 1,
      totalPrice: 0,
      status: 'Confirmed'
    });
    setShowModal(true);
  };

  const openEditModal = (booking) => {
    setModalMode('edit');
    setSelectedBooking(booking);
    setFormData({
      passengerName: booking.passengerName,
      email: booking.email,
      phone: booking.phone,
      from: booking.from,
      to: booking.to,
      date: booking.date,
      flightNumber: booking.flightNumber,
      class: booking.class,
      passengers: booking.passengers,
      totalPrice: booking.totalPrice,
      status: booking.status
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (modalMode === 'add') {
        const result = await bookingsAPI.create(formData);
        if (result.success) {
          await loadData();
          setShowModal(false);
          alert('✅ Booking added successfully!');
        }
      } else {
        const result = await bookingsAPI.update(selectedBooking.id, formData);
        if (result.success) {
          await loadData();
          setShowModal(false);
          alert('✅ Booking updated successfully!');
        }
      }
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('❌ An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (booking) => {
    if (window.confirm(`Are you sure you want to delete booking for ${booking.passengerName}?`)) {
      setLoading(true);
      try {
        const result = await bookingsAPI.delete(booking.id);
        if (result.success) {
          await loadData();
          alert('✅ Booking deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('❌ An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const exportToCSV = () => {
    const headers = ['Booking Ref', 'Passenger Name', 'Email', 'Phone', 'From', 'To', 'Date', 'Flight', 'Class', 'Passengers', 'Price', 'Status'];
    const rows = filteredBookings.map(b => [
      b.bookingRef,
      b.passengerName,
      b.email,
      b.phone,
      b.from,
      b.to,
      b.date,
      b.flightNumber,
      b.class,
      b.passengers,
      b.totalPrice,
      b.status
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skywings_bookings_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <RefreshCw className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 blur-xl opacity-50">
              <RefreshCw className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
            </div>
          </div>
          <p className="text-gray-700 font-semibold text-lg">Loading Dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Modern Header with Gradient */}
      <header className="bg-white shadow-lg sticky top-0 z-40 border-b-2 border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg">
                <Logo variant="light" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 font-medium mt-1">Manage all your flight bookings</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Statistics Cards with Gradient Borders */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Bookings Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-1">Total Bookings</p>
                    <p className="text-4xl font-bold text-gray-900 mb-1">{stats.totalBookings}</p>
                    <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                      <TrendingUp className="w-3 h-3" />
                      <span>All time</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg">
                    <Plane className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Confirmed Bookings Card */}
            <div
              onClick={() => setFilterStatus('Confirmed')}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative p-6 border-l-4 border-emerald-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-1">✅ Confirmed</p>
                    <p className="text-4xl font-bold text-gray-900 mb-1">{stats.confirmedBookings}</p>
                    <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                      <CheckCircle className="w-3 h-3" />
                      <span>Click to filter</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-4 rounded-xl shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Bookings Card */}
            <div
              onClick={() => setFilterStatus('Pending')}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative p-6 border-l-4 border-amber-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-1">⏳ Pending</p>
                    <p className="text-4xl font-bold text-gray-900 mb-1">{stats.pendingBookings}</p>
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                      <Clock className="w-3 h-3" />
                      <span>Click to filter</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-4 rounded-xl shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Cancelled Bookings Card */}
            <div
              onClick={() => setFilterStatus('Cancelled')}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-rose-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative p-6 border-l-4 border-rose-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-1">❌ Cancelled</p>
                    <p className="text-4xl font-bold text-gray-900 mb-1">{stats.cancelledBookings}</p>
                    <div className="flex items-center gap-1 text-xs text-rose-600 font-medium">
                      <X className="w-3 h-3" />
                      <span>Click to filter</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-4 rounded-xl shadow-lg">
                    <X className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Actions Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, phone, or booking reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium"
              />
            </div>

            {/* Filter & Action Buttons */}
            <div className="flex gap-3 w-full lg:w-auto flex-wrap">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-5 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-semibold cursor-pointer hover:border-gray-300"
              >
                <option value="All">All Status</option>
                <option value="Confirmed">✅ Confirmed</option>
                <option value="Pending">⏳ Pending</option>
                <option value="Cancelled">❌ Cancelled</option>
              </select>

              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-md hover:shadow-lg font-semibold transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={loadData}
                className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg font-semibold transform hover:scale-105"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Refresh</span>
              </button>

              <button
                onClick={openAddModal}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-md hover:shadow-lg font-semibold transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                <span>Add Booking</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Bookings Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Booking Reference
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Passenger Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Contact Information
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Route & Class
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Travel Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Passengers
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-gray-100 p-6 rounded-full mb-4">
                          <Search className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-gray-600 text-lg font-semibold mb-2">No bookings found</p>
                        <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-blue-50 transition-colors duration-200">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Plane className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-bold text-blue-600 text-sm">{booking.bookingRef}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-gray-900 mb-1">{booking.passengerName}</p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Plane className="w-3 h-3" />
                            {booking.flightNumber}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-900 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {booking.email}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {booking.phone}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            {booking.from} → {booking.to}
                          </p>
                          <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md inline-block">
                            {booking.class}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-900">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(booking.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-gray-900">{booking.passengers}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="font-bold text-gray-900 text-lg">रु {booking.totalPrice.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`px-4 py-2 rounded-full text-xs font-bold border-2 ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(booking)}
                            className="p-2.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 transform hover:scale-110"
                            title="Edit Booking"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(booking)}
                            className="p-2.5 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 transform hover:scale-110"
                            title="Delete Booking"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bookings Summary Footer */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
          <p className="text-center text-gray-600 font-medium">
            Showing <span className="font-bold text-blue-600">{filteredBookings.length}</span> of <span className="font-bold text-blue-600">{bookings.length}</span> total bookings
          </p>
        </div>
      </main>

      {/* Enhanced Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all animate-slideUp">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 flex items-center justify-between rounded-t-3xl">
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  {modalMode === 'add' ? (
                    <>
                      <Plus className="w-8 h-8" />
                      Add New Booking
                    </>
                  ) : (
                    <>
                      <Edit className="w-8 h-8" />
                      Edit Booking
                    </>
                  )}
                </h2>
                <p className="text-blue-100 text-sm mt-1">Fill in the booking details below</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-200"
              >
                <X className="w-7 h-7 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    Passenger Name *
                  </label>
                  <input
                    type="text"
                    value={formData.passengerName}
                    onChange={(e) => setFormData({ ...formData, passengerName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium"
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium"
                    required
                    placeholder="john.doe@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium"
                    required
                    placeholder="+977-9841234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Plane className="w-4 h-4 text-blue-600" />
                    Flight Number *
                  </label>
                  <input
                    type="text"
                    value={formData.flightNumber}
                    onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium"
                    required
                    placeholder="SK101"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    Departure City *
                  </label>
                  <input
                    type="text"
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium"
                    required
                    placeholder="Kathmandu"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    Arrival City *
                  </label>
                  <input
                    type="text"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium"
                    required
                    placeholder="Pokhara"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Travel Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Cabin Class *
                  </label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium cursor-pointer"
                    required
                  >
                    <option value="Economy">Economy Class</option>
                    <option value="Business">Business Class</option>
                    <option value="First Class">First Class</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    Number of Passengers *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                    Total Price (रु) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.totalPrice}
                    onChange={(e) => setFormData({ ...formData, totalPrice: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium"
                    required
                    placeholder="10000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Booking Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium cursor-pointer"
                    required
                  >
                    <option value="Confirmed">✅ Confirmed</option>
                    <option value="Pending">⏳ Pending</option>
                    <option value="Cancelled">❌ Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t-2 border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Save className="w-6 h-6" />
                  {loading ? 'Saving...' : modalMode === 'add' ? 'Add Booking' : 'Update Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;

