import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { api } from '../services/apiClient';
import { useApp } from '../context/AppContext';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setLoading } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.login({ password });
      navigate('/admin');
    } catch (error) {
      setError('Invalid password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 px-4 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] max-w-md w-full">
        <h1 className="text-2xl font-bold text-text-primary mb-6 text-center">Admin Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Enter admin password"
            />
          </div>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <button
            type="submit"
            className="w-full bg-primary text-white px-6 py-3 rounded-full font-medium
                     transform hover:scale-105 hover:bg-opacity-90 transition-all duration-300
                     shadow-[0_4px_16px_rgba(10,33,192,0.25)] hover:shadow-[0_6px_20px_rgba(10,33,192,0.35)]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
