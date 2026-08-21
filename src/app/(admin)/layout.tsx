import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#151521] text-slate-200">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 ml-64 overflow-y-auto bg-[#151521]">
        {children}
      </main>
    </div>
  );
}
