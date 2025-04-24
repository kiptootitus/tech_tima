import ThemeToggle from '@/components/ThemeToggle';
import './globals.css';
import { AuthProvider} from "@/context/AuthContext";
import Link from "next/link";
import '@/lib/fontawesome';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
 <html lang="en">
      <body>
        <AuthProvider>
        <header className="header">
          <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <ul style={{ display: 'flex', gap: '15px', margin: 0, padding: 0, listStyle: 'none' }}>
<li><Link href="/">Home</Link></li>              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
            <ThemeToggle />
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">© 2025 Tech Tima</footer>
    </AuthProvider>
      </body>
    </html>
  );
}