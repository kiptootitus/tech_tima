'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from '../auth.module.css';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors: typeof errors = {};
    if (!username) newErrors.username = 'Username is required.';
    if (!password) newErrors.password = 'Password is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post('/auth/token/', { username, password });

      const { access, refresh } = res.data;
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      const profileRes = await api.get('/profiles/me/');
      setUser(profileRes.data);

      router.push('/profile');

    } catch (err: any) {
      console.error('Login failed:', err);
      setErrors({ general: 'Invalid username or password.' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.authWrapper}>
      <form onSubmit={handleLogin} className={styles.authCard} noValidate>
        <h2>Login</h2>

        <input
          className={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors((prev) => ({ ...prev, username: undefined }));
          }}
        />
        {errors.username && <p className={styles.error}>{errors.username}</p>}

        <div className={styles.inputWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({
                ...prev,
                password: undefined,
                general: undefined,
              }));
            }}
            className={`${styles.input} ${styles.inputWithIcon}`}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className={styles.iconToggle}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        {errors.password && <p className={styles.error}>{errors.password}</p>}
        {errors.general && <p className={styles.error}>{errors.general}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
