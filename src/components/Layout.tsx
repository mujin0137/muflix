import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-text-main font-sans">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
