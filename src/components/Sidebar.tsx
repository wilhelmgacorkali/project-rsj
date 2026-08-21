"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen,
  LogOut
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

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
    <aside className="fixed inset-y-0 left-0 z-20 flex flex-col w-64 bg-[#1a1c23] text-slate-400">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-8">
        <Link href="/" className="flex items-center justify-center p-1 rounded-xl bg-white shadow-lg shadow-teal-500/20 w-[140px] h-[75px] relative overflow-hidden">
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
                  ? "bg-[#c5f1e7] text-[#1a1c23] font-bold"
                  : "hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={20} className={isActive ? "text-[#1a1c23]" : "text-slate-500"} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Area: Logout & User Info */}
      <div className="p-4 mt-auto space-y-3 border-t border-white/5">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Keluar / Logout</span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-[#151521]/60">
          <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white overflow-hidden border border-slate-600">
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" alt="Admin" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">Administrator</p>
            <p className="text-[10px] text-slate-500 truncate">Pekanbaru, Riau</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
