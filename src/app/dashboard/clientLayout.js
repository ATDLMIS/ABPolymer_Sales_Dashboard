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
   <div className="min-h-screen max-w-[1540px] mx-auto">
  <div className="grid grid-cols-12">
    {/* Desktop sidebar (static on md+) */}
    <aside className="hidden md:block md:col-span-3 bg-primary1 lg:col-span-2 min-h-screen">
      <Navbar session={session} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
    </aside>

    {/* Mobile off-canvas sidebar (fixed) */}
    <div
      id="mobile-sidebar"
      className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 transform transition-transform duration-300 ease-in-out md:hidden
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

    {/* Main content */}
    <main className="col-span-12 md:col-span-9 lg:col-span-10 bg-surface2 min-h-screen flex flex-col">
      {/* Topbar */}
      <div className="flex items-center justify-between p-3 sm:p-4 bg-primary1">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hamburger toggles sidebar on mobile */}
          <button
            aria-controls="mobile-sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((s) => !s)}
            className="md:hidden p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
          >
            {sidebarOpen ? <HiX className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <HiMenu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
          </button>

          {/* Optional brand text / logo (visible on small screens) */}
          <div className="text-white font-semibold text-lg md:hidden"> 
            <img
              src="/images/logo.png"
              height={40}
              width={150}
              alt="Brand Name"
              className="h-8 sm:h-10 w-auto"
            />
          </div>
        </div>

        {/* Right: profile */}
        <div>
          <NavProfile session={session} />
        </div>
      </div>

      {/* Page content area */}
      <div className="p-3 sm:p-4 md:p-6 flex-1">{children}</div>

      <Footer />
    </main>
  </div>
</div>
  );
}
