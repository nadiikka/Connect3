import { useState } from 'react';
import { SignUpScreenProps } from '../types';

export function SignUpScreen({ onSignUp, onBackToLogin }: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-100 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
          Create Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xl font-semibold text-gray-800 mb-3">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full text-2xl p-6 border-4 border-gray-300 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-xl font-semibold text-gray-800 mb-3">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-2xl p-6 border-4 border-gray-300 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-xl font-semibold text-gray-800 mb-3">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full text-2xl p-6 border-4 border-gray-300 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="Enter your age"
              required
            />
          </div>
          <div>
            <label className="block text-xl font-semibold text-gray-800 mb-3">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full text-2xl p-6 border-4 border-gray-300 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
              placeholder="Create a password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all active:scale-98 text-2xl font-bold"
          >
            Create Account
          </button>
        </form>
        <button
          onClick={onBackToLogin}
          className="w-full text-center text-purple-600 mt-6 text-xl font-semibold hover:text-purple-700 transition-colors"
        >
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
}