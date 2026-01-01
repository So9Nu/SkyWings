// Mock data for standalone frontend (no backend required)

// Sample bookings data
let mockBookings = [
  {
    id: 1,
    bookingRef: 'SW-KTM-PKR-001',
    passengerName: 'Binita Chaudhary',
    email: 'binita.chaudhary@email.com',
    phone: '+977-9841234567',
    from: 'Ramgram',
    to: 'Kathmandu',
    date: '2026-01-15',
    flightNumber: 'SK101',
    class: 'Economy',
    passengers: 1,
    totalPrice: 8500,
    status: 'Confirmed'
  },
  {
    id: 2,
    bookingRef: 'SW-KTM-PKR-002',
    passengerName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+977-9841234568',
    from: 'Kathmandu',
    to: 'Pokhara',
    date: '2026-01-15',
    flightNumber: 'SK102',
    class: 'Economy',
    passengers: 2,
    totalPrice: 15000,
    status: 'Confirmed'
  },
  {
    id: 3,
    bookingRef: 'SW-PKR-KTM-003',
    passengerName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+977-9851234569',
    from: 'Pokhara',
    to: 'Kathmandu',
    date: '2026-01-16',
    flightNumber: 'SK103',
    class: 'Business',
    passengers: 1,
    totalPrice: 12000,
    status: 'Confirmed'
  },
  {
    id: 4,
    bookingRef: 'SW-KTM-BIR-004',
    passengerName: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+977-9861234570',
    from: 'Kathmandu',
    to: 'Biratnagar',
    date: '2026-01-20',
    flightNumber: 'SK201',
    class: 'Economy',
    passengers: 3,
    totalPrice: 24000,
    status: 'Pending'
  },
  {
    id: 5,
    bookingRef: 'SW-KTM-LUK-005',
    passengerName: 'Emily Davis',
    email: 'emily.davis@email.com',
    phone: '+977-9871234571',
    from: 'Kathmandu',
    to: 'Lukla',
    date: '2026-01-25',
    flightNumber: 'SK301',
    class: 'Economy',
    passengers: 1,
    totalPrice: 18000,
    status: 'Confirmed'
  },
  {
    id: 6,
    bookingRef: 'SW-KTM-NPJ-006',
    passengerName: 'David Wilson',
    email: 'david.wilson@email.com',
    phone: '+977-9881234572',
    from: 'Kathmandu',
    to: 'Nepalgunj',
    date: '2026-01-18',
    flightNumber: 'SK401',
    class: 'Business',
    passengers: 2,
    totalPrice: 28000,
    status: 'Confirmed'
  },
  {
    id: 7,
    bookingRef: 'SW-PKR-JOM-007',
    passengerName: 'Jessica Martinez',
    email: 'jessica.martinez@email.com',
    phone: '+977-9891234573',
    from: 'Pokhara',
    to: 'Jomsom',
    date: '2026-01-22',
    flightNumber: 'SK501',
    class: 'Economy',
    passengers: 4,
    totalPrice: 32000,
    status: 'Pending'
  },
  {
    id: 8,
    bookingRef: 'SW-KTM-PKR-008',
    passengerName: 'Robert Taylor',
    email: 'robert.taylor@email.com',
    phone: '+977-9801234574',
    from: 'Kathmandu',
    to: 'Pokhara',
    date: '2026-01-12',
    flightNumber: 'SK103',
    class: 'Economy',
    passengers: 1,
    totalPrice: 7500,
    status: 'Cancelled'
  },
  {
    id: 9,
    bookingRef: 'SW-KTM-BIR-009',
    passengerName: 'Amanda Anderson',
    email: 'amanda.anderson@email.com',
    phone: '+977-9811234575',
    from: 'Kathmandu',
    to: 'Biratnagar',
    date: '2026-02-05',
    flightNumber: 'SK202',
    class: 'Business',
    passengers: 2,
    totalPrice: 16000,
    status: 'Pending'
  },
  {
    id: 10,
    bookingRef: 'SW-LUK-KTM-010',
    passengerName: 'Christopher Lee',
    email: 'chris.lee@email.com',
    phone: '+977-9821234576',
    from: 'Lukla',
    to: 'Kathmandu',
    date: '2026-01-08',
    flightNumber: 'SK302',
    class: 'Economy',
    passengers: 1,
    totalPrice: 18000,
    status: 'Cancelled'
  },
  {
    id: 11,
    bookingRef: 'SW-KTM-PKR-011',
    passengerName: 'Lisa Thompson',
    email: 'lisa.thompson@email.com',
    phone: '+977-9831234577',
    from: 'Kathmandu',
    to: 'Pokhara',
    date: '2026-02-10',
    flightNumber: 'SK104',
    class: 'First Class',
    passengers: 2,
    totalPrice: 25000,
    status: 'Confirmed'
  }
];

// Mock users
let mockUsers = [];
let currentUser = null;

// Mock deals data
const mockDeals = [
  {
    _id: '1',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    destination: 'Pokhara, Nepal',
    rating: '4.8',
    reviews: 1250,
    discountedPrice: 7500,
    discount: 38,
    departureCity: 'Kathmandu',
    duration: '25 min'
  },
  {
    _id: '2',
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80',
    destination: 'Mount Everest Base Camp (Lukla), Nepal',
    rating: '4.9',
    reviews: 890,
    discountedPrice: 18000,
    discount: 28,
    departureCity: 'Kathmandu',
    duration: '35 min'
  },
  {
    _id: '3',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    destination: 'Chitwan National Park, Nepal',
    rating: '4.7',
    reviews: 650,
    discountedPrice: 8000,
    discount: 27,
    departureCity: 'Kathmandu',
    duration: '40 min'
  },
  {
    _id: '4',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80',
    destination: 'Jomsom (Mustang), Nepal',
    rating: '4.6',
    reviews: 520,
    discountedPrice: 15000,
    discount: 25,
    departureCity: 'Pokhara',
    duration: '20 min'
  },
  {
    _id: '5',
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=800&q=80',
    destination: 'Annapurna Base Camp Trek Starting Point',
    rating: '4.8',
    reviews: 720,
    discountedPrice: 9500,
    discount: 30,
    departureCity: 'Kathmandu',
    duration: '30 min'
  },
  {
    _id: '6',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    destination: 'Lumbini (Birthplace of Buddha), Nepal',
    rating: '4.5',
    reviews: 580,
    discountedPrice: 11000,
    discount: 22,
    departureCity: 'Kathmandu',
    duration: '45 min'
  }
];

// Helper function to generate booking reference
const generateBookingRef = () => {
  const timestamp = Date.now().toString(36);
  return `SW-${timestamp.toUpperCase()}`;
};

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API (Mock)
export const authAPI = {
  register: async (userData) => {
    await delay();
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      createdAt: new Date().toISOString()
    };
    mockUsers.push(newUser);
    const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email }));
    localStorage.setItem('token', token);
    currentUser = newUser;
    return { data: { user: newUser, token } };
  },

  login: async (credentials) => {
    await delay();
    const user = mockUsers.find(u => u.email === credentials.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
    localStorage.setItem('token', token);
    currentUser = user;
    return { data: { user, token } };
  },

  getMe: async () => {
    await delay();
    if (!currentUser) {
      throw new Error('Not authenticated');
    }
    return { data: currentUser };
  },

  updatePassword: async (passwords) => {
    await delay();
    return { data: { message: 'Password updated successfully' } };
  }
};

// Flight API (Mock)
export const flightAPI = {
  getAllFlights: async () => {
    await delay();
    const flights = [
      { id: 1, from: 'Kathmandu', to: 'Pokhara', flightNumber: 'SK101', price: 7500 },
      { id: 2, from: 'Pokhara', to: 'Kathmandu', flightNumber: 'SK102', price: 7500 },
      { id: 3, from: 'Kathmandu', to: 'Biratnagar', flightNumber: 'SK201', price: 8000 },
      { id: 4, from: 'Kathmandu', to: 'Lukla', flightNumber: 'SK301', price: 18000 }
    ];
    return { data: flights };
  },

  getFlight: async (id) => {
    await delay();
    const flights = await flightAPI.getAllFlights();
    const flight = flights.data.find(f => f.id === parseInt(id));
    if (!flight) throw new Error('Flight not found');
    return { data: flight };
  },

  searchFlights: async (params) => {
    await delay();
    const flights = await flightAPI.getAllFlights();
    return { data: flights.data };
  },

  createFlight: async (flightData) => {
    await delay();
    return { data: { id: Date.now(), ...flightData } };
  },

  updateFlight: async (id, flightData) => {
    await delay();
    return { data: { id, ...flightData } };
  },

  deleteFlight: async (id) => {
    await delay();
    return { data: { message: 'Flight deleted' } };
  }
};

// Booking API (Mock)
export const bookingAPI = {
  getAllBookings: async () => {
    await delay();
    return { data: [...mockBookings] };
  },

  getMyBookings: async () => {
    await delay();
    return { data: mockBookings.filter(b => b.status !== 'Cancelled') };
  },

  getBooking: async (id) => {
    await delay();
    const booking = mockBookings.find(b => b.id === parseInt(id));
    if (!booking) throw new Error('Booking not found');
    return { data: booking };
  },

  createBooking: async (bookingData) => {
    await delay();
    const newBooking = {
      id: mockBookings.length + 1,
      bookingRef: generateBookingRef(),
      ...bookingData,
      createdAt: new Date().toISOString()
    };
    mockBookings.push(newBooking);
    return { data: newBooking };
  },

  updateBooking: async (id, bookingData) => {
    await delay();
    const index = mockBookings.findIndex(b => b.id === parseInt(id));
    if (index === -1) throw new Error('Booking not found');
    mockBookings[index] = { ...mockBookings[index], ...bookingData };
    return { data: mockBookings[index] };
  },

  cancelBooking: async (id) => {
    await delay();
    const index = mockBookings.findIndex(b => b.id === parseInt(id));
    if (index === -1) throw new Error('Booking not found');
    mockBookings.splice(index, 1);
    return { data: { message: 'Booking cancelled' } };
  }
};

// User API (Mock)
export const userAPI = {
  getAllUsers: async () => {
    await delay();
    return { data: mockUsers };
  },

  getUser: async (id) => {
    await delay();
    const user = mockUsers.find(u => u.id === parseInt(id));
    if (!user) throw new Error('User not found');
    return { data: user };
  },

  updateUser: async (id, userData) => {
    await delay();
    const index = mockUsers.findIndex(u => u.id === parseInt(id));
    if (index === -1) throw new Error('User not found');
    mockUsers[index] = { ...mockUsers[index], ...userData };
    return { data: mockUsers[index] };
  },

  deleteUser: async (id) => {
    await delay();
    const index = mockUsers.findIndex(u => u.id === parseInt(id));
    if (index === -1) throw new Error('User not found');
    mockUsers.splice(index, 1);
    return { data: { message: 'User deleted' } };
  }
};

// Contact API (Mock)
export const contactAPI = {
  submitContact: async (contactData) => {
    await delay();
    return { data: { message: 'Message sent successfully', ...contactData } };
  },

  getAllMessages: async () => {
    await delay();
    return { data: [] };
  },

  updateMessageStatus: async (id, status) => {
    await delay();
    return { data: { message: 'Status updated' } };
  }
};

// Deal API (Mock)
export const dealAPI = {
  getTopDeals: async () => {
    await delay();
    return { data: mockDeals };
  },

  getDeal: async (id) => {
    await delay();
    const deal = mockDeals.find(d => d.id === parseInt(id));
    if (!deal) throw new Error('Deal not found');
    return { data: deal };
  }
};

// Bookings API for Admin (wrapper with error handling)
export const bookingsAPI = {
  // Get all bookings
  getAll: async () => {
    try {
      const response = await bookingAPI.getAllBookings();
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return { success: false, error: error.message };
    }
  },

  // Get booking by ID
  getById: async (id) => {
    try {
      const response = await bookingAPI.getBooking(id);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error fetching booking:', error);
      return { success: false, error: error.message };
    }
  },

  // Create new booking
  create: async (bookingData) => {
    try {
      const response = await bookingAPI.createBooking(bookingData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error creating booking:', error);
      return { success: false, error: error.message };
    }
  },

  // Update booking
  update: async (id, bookingData) => {
    try {
      const response = await bookingAPI.updateBooking(id, bookingData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error updating booking:', error);
      return { success: false, error: error.message };
    }
  },

  // Delete booking
  delete: async (id) => {
    try {
      const response = await bookingAPI.cancelBooking(id);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error deleting booking:', error);
      return { success: false, error: error.message };
    }
  },

  // Search bookings
  search: async (query) => {
    try {
      const response = await bookingAPI.getAllBookings();
      const filtered = response.data.filter(booking =>
        booking.bookingRef?.toLowerCase().includes(query.toLowerCase()) ||
        booking.passengerName?.toLowerCase().includes(query.toLowerCase()) ||
        booking.email?.toLowerCase().includes(query.toLowerCase()) ||
        booking.phone?.includes(query)
      );
      return { success: true, data: filtered };
    } catch (error) {
      console.error('Error searching bookings:', error);
      return { success: false, error: error.message };
    }
  }
};

// Statistics API
export const statsAPI = {
  getStats: async () => {
    try {
      const response = await bookingAPI.getAllBookings();
      const bookings = response.data;

      const stats = {
        totalBookings: bookings.length,
        confirmedBookings: bookings.filter(b => b.status === 'Confirmed').length,
        pendingBookings: bookings.filter(b => b.status === 'Pending').length,
        cancelledBookings: bookings.filter(b => b.status === 'Cancelled').length,
        totalRevenue: bookings
          .filter(b => b.status === 'Confirmed')
          .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
        totalPassengers: bookings
          .filter(b => b.status === 'Confirmed')
          .reduce((sum, b) => sum + (b.passengers || 0), 0)
      };
      return { success: true, data: stats };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { success: false, error: error.message };
    }
  }
};

export default {
  authAPI,
  flightAPI,
  bookingAPI,
  userAPI,
  contactAPI,
  dealAPI,
  bookingsAPI,
  statsAPI
};
