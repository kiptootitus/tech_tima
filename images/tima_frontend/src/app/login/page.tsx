'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) return alert('All fields are required.');

    try {
      const res = await api.post('/login/', { username, password });
      localStorage.setItem('token', res.data.token);
      router.push('/profile');
    } catch (err) {
      alert('Login failed');
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gradient-to-b from-green-900 to-blue-900 p-8 rounded-lg shadow-xl w-full max-w-md text-white"
      >
        <h2 className="text-center text-2xl font-semibold mb-6 text-teal-200">Login</h2>

        <input
          className="w-full p-3 mb-4 rounded bg-white text-gray-800"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded bg-white text-gray-800 pr-10"
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
