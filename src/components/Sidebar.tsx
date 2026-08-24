"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen,
  LogOut,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { darkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
      router.push("/");
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Anak Magang",
      href: "/magang",
      icon: Users,
    },
    {
      name: "Penelitian",
      href: "/penelitian",
      icon: BookOpen,
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex flex-col w-64 bg-white dark:bg-[#1a1c23] text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-white/5 transition-colors duration-200 shadow-sm">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-8">
        <Link href="/" className="flex items-center justify-center p-1 rounded-xl bg-white shadow-lg shadow-teal-500/20 w-[140px] h-[75px] relative overflow-hidden border border-slate-100 dark:border-transparent">
          <img 
            src="/logo.png" 
            alt="Logo RSJ Tampan" 
            className="object-contain w-full h-full"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-teal-500/20 text-teal-800 dark:bg-[#c5f1e7] dark:text-[#1a1c23] font-bold shadow-sm"
                  : "hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon size={20} className={isActive ? "text-teal-700 dark:text-[#1a1c23]" : "text-slate-400 dark:text-slate-500"} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Area: Theme Toggle, Logout & User Info */}
      <div className="p-4 mt-auto space-y-3 border-t border-slate-200 dark:border-white/5">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#151521]/80 hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/5"
          title={darkMode ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
        >
          <span className="flex items-center gap-3">
            {darkMode ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-teal-600" />
            )}
            <span className="font-semibold text-xs">{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-white/10 font-bold text-slate-600 dark:text-slate-300 shadow-sm">
            {darkMode ? "Dark Active" : "Light Active"}
          </span>
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Keluar / Logout</span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-100 dark:bg-[#151521]/60 border border-slate-200 dark:border-transparent">
          <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-white overflow-hidden border border-slate-300 dark:border-slate-600">
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="Admin" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-slate-800 dark:text-white truncate">Administrator</p>
            <p className="text-[10px] text-slate-500 truncate">Pekanbaru, Riau</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

