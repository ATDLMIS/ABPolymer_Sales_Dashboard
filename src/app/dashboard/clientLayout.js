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
    <div className="min-h-screen w-full flex">
      {/* Desktop sidebar (static on md+) */}
      <aside className="hidden md:flex md:flex-col md:w-64 lg:w-72 xl:w-80 bg-primary1 md:min-h-screen md:fixed md:left-0 md:top-0 md:bottom-0 md:overflow-y-auto">
        <Navbar session={session} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      </aside>

          {/* Mobile off-canvas sidebar (fixed) */}
          <div
            id="mobile-sidebar"
            className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 transform transition-transform duration-300 ease-in-out md:hidden bg-primary1
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            aria-hidden={!sidebarOpen}
          >
            <div className="h-full overflow-auto">
              <Navbar session={session} onNavigate={() => setSidebarOpen(false)} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
          </div>

          {/* Overlay when mobile sidebar is open */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />
          )}

      {/* Main content wrapper - offset by sidebar on desktop */}
      <div className="flex-1 min-w-0 w-full md:ml-64 lg:ml-72 xl:ml-80 bg-surface2 min-h-screen flex flex-col">
        {/* Topbar - Sticky for better UX */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4 md:px-6 bg-primary1 shadow-md">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Hamburger toggles sidebar on mobile */}
                <button
                  aria-controls="mobile-sidebar"
                  aria-expanded={sidebarOpen}
                  onClick={() => setSidebarOpen((s) => !s)}
                  className="md:hidden p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Toggle sidebar"
                >
                  {sidebarOpen ? <HiX className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <HiMenu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
                </button>

                {/* Brand logo (visible on mobile) */}
                <div className="md:hidden flex-shrink-0"> 
                  <img
                    src="/images/logo.png"
                    alt="Brand Logo"
                    className="h-8 sm:h-10 w-auto max-w-[120px] sm:max-w-[150px]"
                  />
                </div>
              </div>

              {/* Right: profile */}
              <div className="flex-shrink-0">
                <NavProfile session={session} />
              </div>
            </div>

        {/* Page content area - Responsive padding */}
        <div className="flex-1 w-full overflow-x-hidden">
          <div className="m-2">
            {children}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}