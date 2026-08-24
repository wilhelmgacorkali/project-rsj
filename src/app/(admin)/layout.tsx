"use client";

import Sidebar from "@/components/Sidebar";
import { useTheme } from "@/hooks/useTheme";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useTheme(); // Ensure theme is initialized on admin pages

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-[#151521] text-slate-800 dark:text-slate-200 transition-colors duration-200">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 ml-64 overflow-y-auto bg-slate-100 dark:bg-[#151521] transition-colors duration-200 min-h-screen">
        {children}
      </main>
    </div>
  );
}

