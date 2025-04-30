'use client';

import AuthWrapper from './AuthWrapper';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { user, setUser, loading } = useAuth();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
    router.push('/login');
  }

  if (loading) return <p style={{ padding: '2rem' }}>Loading...</p>;

  return (
    <>
        <nav className="nav-container">
        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <ul style={{ display: 'flex', gap: '15px', margin: 0, padding: 0, listStyle: 'none' }}>
            <li><Link href="/">Home</Link></li>

            {!user ? (
              <>
                <li><Link href="/login">Login</Link></li>
                <li><Link href="/register">Register</Link></li>
              </>
            ) : (
              <>
                <li><Link href="/profile">Profile</Link></li>
                <li>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'red',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
          <ThemeToggle />
        </nav>
      </nav>

      <main className="container">{children}</main>
      <footer className="footer">© 2025 Tech Tima</footer>
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper>
      <LayoutContent>{children}</LayoutContent>
    </AuthWrapper>
  );
}
