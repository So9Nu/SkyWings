import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Phone, CheckCircle } from 'lucide-react';
import Logo from '../components/Logo';

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Mock registration - in real app, this would call an API
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone
      }));
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-600 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size="large" variant="dark" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Join us to start booking flights worldwide</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="John"
                  />
                </div>
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Doe"
                  />
                </div>
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="+977-9806877533"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Must be 8+ characters with uppercase, lowercase, and number
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I agree to the <Link to="/terms" className="text-blue-600 hover:underline font-semibold">Terms of Service</Link> and <Link to="/privacy" className="text-blue-600 hover:underline font-semibold">Privacy Policy</Link>
                </span>
              </label>
              {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Create Account
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>

          {/* Benefits Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-4 font-semibold">Why join us?</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">Easy Booking</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">Best Prices</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">24/7 Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
