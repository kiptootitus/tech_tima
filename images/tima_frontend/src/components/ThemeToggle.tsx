'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', stored);
    setTheme(stored);
  }, []);

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  }

  return (
    <button onClick={toggleTheme} style={{ marginLeft: 'auto' }}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
