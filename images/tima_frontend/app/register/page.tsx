'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';
import styles from '../auth.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      await api.post('/register/', {
        username: form.username,
        email: form.email,
        first_name: form.first_name,
        last_name: form.last_name,
        password: form.password,
      });
      alert('Registered successfully!');
      router.push('/login');
    } catch {
      alert('Registration failed');
    }
  }

  return (
    <div className={styles.authWrapper}>
      <form onSubmit={handleRegister} className={styles.authCard}>
        <h2>Register</h2>
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name" required />
        <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" required />

        <div className={styles.inputWrapper}>
          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            className={styles.inputWithIcon}
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className={styles.iconToggle}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className={styles.inputWrapper}>
          <input
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            className={styles.inputWithIcon}
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
