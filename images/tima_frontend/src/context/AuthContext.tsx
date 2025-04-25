'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/axios';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');

    if (!access || !refresh) {
      setLoading(false);
      return;
    }

    // Set token globally
    api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

    // Try fetching the profile
    api.get('/profiles/me/')
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
