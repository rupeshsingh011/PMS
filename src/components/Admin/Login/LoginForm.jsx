import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: 'admin', password: 'password123' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Bypass for default credentials so you can test without a database connected
    if (formData.username === 'admin' && formData.password === 'password123') {
      setTimeout(() => {
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('role', 'admin');
        navigate('/admin');
      }, 800);
      return;
    }
    
    if (formData.username === 'client' && formData.password === 'password123') {
      setTimeout(() => {
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('role', 'client');
        navigate('/client');
      }, 800);
      return;
    }

    try {
      // With our Vite proxy, we can just fetch from /api/auth/login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      setLoading(false);

      if (response.ok) {
        // Store token (in real app, probably in context/localStorage)
        localStorage.setItem('token', data.token);
        
        // Redirect based on role
        if (data.role === 'admin') {
           navigate('/admin');
        } else {
           navigate('/client');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Failed to connect to server. Ensure your database is running, or use admin / password123 or client / password123');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
          {error}
        </div>
      )}

      {/* Username Field */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <User className="w-4 h-4" /> Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 font-medium"
            required
          />
        </div>
      </div>

      {/* Password Field */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
            <Lock className="w-4 h-4" /> Password
          </label>
          <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Forgot Password?
          </a>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 font-medium"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Remember Me */}
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer select-none">
          Remember me
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-2"
      >
        {loading ? 'Signing in...' : 'Sign In'}
        {!loading && <ArrowRight className="w-5 h-5" />}
      </button>


    </form>
  );
};

export default LoginForm;
