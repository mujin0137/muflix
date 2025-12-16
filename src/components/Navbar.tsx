import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import { useAuthStore } from '../stores/useAuthStore';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full px-4 py-4 transition-colors duration-300 md:px-16 ${
        isScrolled ? 'bg-background' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
            {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            MUFLIX
          </Link>
          {/* Desktop Menu */}
          <div className="hidden gap-6 md:flex text-sm text-gray-300">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="#" className="hover:text-white transition">Movies</Link>
            <Link to="#" className="hover:text-white transition">New & Popular</Link>
          </div>
        </div>

        <div className="flex items-center gap-6 text-white">
          {user && <span className="text-sm font-medium">{user.email}</span>}
          <button onClick={() => navigate('/search')} className="hover:text-gray-300">
            <Search className="h-6 w-6" />
          </button>
          
          {user ? (
             <div className="flex items-center gap-4">
                <button className="hover:text-gray-300">
                    <Bell className="h-6 w-6" />
                </button>
                <div className="group relative">
                    <button className="flex items-center gap-2 hover:text-gray-300">
                        <User className="h-6 w-6" />
                    </button>
                    {/* Simple Dropdown for Logout */}
                    <div className="absolute right-0 mt-2 w-32 bg-black/90 border border-gray-700 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <button onClick={logout} className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 text-white">
                            로그아웃
                        </button>
                    </div>
                </div>
             </div>
          ) : (
            <>
                <button className="hover:text-gray-300">
                    <Bell className="h-6 w-6" />
                </button>
                <button className="flex items-center gap-2 hover:text-gray-300">
                    <Link to="/login" className="hover:text-white transition"><User className="h-6 w-6" /></Link>
                </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
