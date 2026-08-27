"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User, LogOut, FileText, Home } from "lucide-react";
import { useState, useEffect } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState({ nama: "Budi Santoso", institusi: "Universitas Riau" });

  useEffect(() => {
    const stored = localStorage.getItem("rsj_current_user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.nama) {
          setCurrentUser({
            nama: parsed.nama,
            institusi: parsed.institusi || "Universitas Riau"
          });
        }
      } catch (e) {}
    }
  }, []);

  const navLinks = [
    { href: "/portal", label: "Beranda", icon: Home },
    { href: "/pengajuan", label: "Pengajuan", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-teal-500/30">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-6">
              <Link href="/portal" className="flex items-center gap-3">
                <div className="flex items-center justify-center p-1 rounded-lg bg-white shadow-sm border border-slate-100 w-[100px] h-[50px] overflow-hidden">
                  <img 
                    src="/logo.png" 
                    alt="Logo RSJ Tampan" 
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-sm font-bold leading-tight text-teal-700 dark:text-teal-400">Portal SIP</h1>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Mahasiswa & Peneliti</p>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1 ml-4 border-l border-slate-200 dark:border-slate-700 pl-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                      }`}
                    >
                      <link.icon size={16} className={isActive ? "text-teal-600 dark:text-teal-400" : "text-slate-400"} />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>

              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{currentUser.nama}</p>
                    <p className="text-[10px] text-slate-500">{currentUser.institusi}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white shadow-sm">
                    <User size={16} />
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden py-1">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 sm:hidden">
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{currentUser.nama}</p>
                      <p className="text-xs text-slate-500">{currentUser.institusi}</p>
                    </div>
                    <Link href="/portal/profil" className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <User size={16} />
                      Profil Saya
                    </Link>
                    <Link href="/login" className="flex items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors border-t border-slate-100 dark:border-slate-800">
                      <LogOut size={16} />
                      Keluar
                    </Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16 md:mb-0">
        {children}
      </main>

      {/* Mobile Nav Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around py-3 z-50 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 ${
                isActive ? "text-teal-600 dark:text-teal-400" : "text-slate-500"
              }`}
            >
              <link.icon size={20} />
              <span className="text-[10px] font-semibold">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
