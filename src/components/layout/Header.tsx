import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { classNames } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/movies', label: 'Movies' },
  { path: '/explore', label: 'Explore' },
];

export const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-primary/95 backdrop-blur-sm border-b border-[#222]">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-accent">Cine</span>
            <span className="text-2xl font-bold text-text-primary">Assets</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={classNames(
                  'text-sm font-medium transition-colors hover:text-accent',
                  location.pathname === link.path
                    ? 'text-accent'
                    : 'text-text-secondary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <Link
            to="/search"
            className="p-2 text-text-secondary hover:text-accent transition-colors"
            title="Search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
          
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/admin"
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                Admin
              </Link>
              <button
                onClick={handleSignOut}
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm bg-accent text-black px-4 py-1.5 rounded font-medium hover:bg-accent-hover transition-colors"
            >
              Sign In
            </Link>
          )}
          
          <button
            className="md:hidden p-2 text-text-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#222]">
          <nav className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={classNames(
                  'block py-2 px-3 rounded text-sm font-medium transition-colors',
                  location.pathname === link.path
                    ? 'bg-secondary text-accent'
                    : 'text-text-secondary'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <Link
                to="/admin"
                className="block py-2 px-3 rounded text-sm font-medium text-text-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};