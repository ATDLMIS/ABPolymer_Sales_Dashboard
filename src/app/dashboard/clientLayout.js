// components/layouts/DashboardLayoutClient.jsx
'use client';

import { useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import Navbar from '@/components/navbar/Navbar';
import NavProfile from '@/components/navbar/NavProfile';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

export default function DashboardLayoutClient({ session, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // close the sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // close on escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen max-w-[1540px] mx-auto ">
      <div className="grid grid-cols-12">
        {/* Desktop sidebar (static on md+) */}
        <aside className="hidden md:block md:col-span-3 bg-primary1 min-h-screen">
          <Navbar session={session} />
        </aside>

        {/* Mobile off-canvas sidebar (fixed) */}
        <div
          id="mobile-sidebar"
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-700 transform transition-transform duration-300 ease-in-out md:hidden
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          aria-hidden={!sidebarOpen}
        >
          <div className="h-full overflow-auto">
            {/* Pass a callback prop if you want the Navbar to close the menu on navigation */}
            <Navbar session={session} onNavigate={() => setSidebarOpen(false)} />
          </div>
        </div>

        {/* Overlay when mobile sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main content */}
        <main className="col-span-12 md:col-span-9 bg-surface2 min-h-screen flex flex-col">
          {/* Topbar */}
          <div className="flex items-center justify-between p-3 bg-primary1">
            <div className="flex items-center gap-3">
              {/* Hamburger toggles sidebar on mobile */}
              <button
                aria-controls="mobile-sidebar"
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen((s) => !s)}
                className="md:hidden p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
              >
                {sidebarOpen ? <HiX className="w-6 h-6 text-white" /> : <HiMenu className="w-6 h-6 text-white" />}
              </button>

              {/* Optional brand text / logo (visible on small screens) */}
              <div className="text-white font-semibold text-lg md:hidden"> 
                
                        <img
                          src="/images/logo.png"
                          height={50}
                          width={190}
                          alt="Brand Name"
                        />
                      
                      </div>
            </div>

            {/* Right: profile */}
            <div>
              <NavProfile session={session} />
            </div>
          </div>

          {/* Page content area */}
          <div className="p-3 flex-1">{children}</div>

          <Footer />
        </main>
      </div>
    </div>
  );
}
