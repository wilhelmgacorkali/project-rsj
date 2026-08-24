"use client";

import { usePersistentData } from "@/hooks/usePersistentData";
import { useTheme } from "@/hooks/useTheme";
import { 
  Users, 
  BookOpen, 
  Search, 
  Bell, 
  ChevronDown, 
  Activity, 
  Award,
  Sun,
  Moon
} from "lucide-react";

export default function Dashboard() {
  const { magangList, penelitianList, isLoaded } = usePersistentData();
  const { darkMode, toggleTheme } = useTheme();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculate statistics
  const totalMagang = magangList.length || 120;
  const totalPenelitian = penelitianList.length || 45;
  const totalSelesai = magangList.filter(m => m.status === "Selesai").length + penelitianList.filter(p => p.status === "Selesai" || p.status === "Disetujui").length || 85;
  const totalPending = magangList.filter(m => m.status === "Menunggu").length + penelitianList.filter(p => p.status === "Ditinjau").length || 12;

  return (
    <div className="space-y-6 animate-fadeIn pb-10 font-sans">
      {/* Top Header Row (Search, Theme Toggle & Profile) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#1a1c23] p-4 rounded-2xl border border-slate-200/80 dark:border-transparent shadow-sm transition-colors duration-200">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-3 text-slate-400 dark:text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Cari data..." 
            className="w-full bg-slate-100 dark:bg-[#151521] border border-slate-200 dark:border-transparent text-sm text-slate-800 dark:text-slate-200 rounded-xl pl-12 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#151521] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-white/5 shadow-sm text-xs font-bold"
            title={darkMode ? "Ganti ke Light Mode" : "Ganti ke Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? (
              <>
                <Sun size={16} className="text-amber-400" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={16} className="text-teal-600" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <Bell size={20} />
            <span className="absolute 1 top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-[#1a1c23]"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-white/10 cursor-pointer">
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=0D9488&color=fff" className="w-8 h-8 rounded-full border border-teal-500/30" alt="Profile" />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-800 dark:text-white">Admin RSJ</p>
              <p className="text-[10px] text-slate-500">Superadmin</p>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Stats + Top Products + Earnings) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Ringkasan Pendaftaran */}
          <div className="bg-white dark:bg-[#1a1c23] p-6 rounded-2xl border border-slate-200/80 dark:border-transparent shadow-sm transition-colors duration-200">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Ringkasan Pendaftaran</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Data pendaftaran periode berjalan</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="bg-slate-50 dark:bg-[#151521] p-4 rounded-xl space-y-3 border border-slate-200/60 dark:border-transparent shadow-sm">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Users size={20} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{totalMagang}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Total Magang</p>
                </div>
                <p className="text-[10px] text-amber-500 font-medium">+10% dari bulan lalu</p>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 dark:bg-[#151521] p-4 rounded-xl space-y-3 border border-slate-200/60 dark:border-transparent shadow-sm">
                <div className="w-10 h-10 rounded-full bg-teal-500/10 flex items-center justify-center">
                  <BookOpen size={20} className="text-teal-600 dark:text-[#c5f1e7]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{totalPenelitian}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Total Penelitian</p>
                </div>
                <p className="text-[10px] text-teal-600 dark:text-[#c5f1e7] font-medium">+8% dari bulan lalu</p>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-50 dark:bg-[#151521] p-4 rounded-xl space-y-3 border border-slate-200/60 dark:border-transparent shadow-sm">
                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center">
                  <Activity size={20} className="text-rose-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{totalPending}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Menunggu Review</p>
                </div>
                <p className="text-[10px] text-rose-500 font-medium">+2% dari bulan lalu</p>
              </div>

              {/* Card 4 */}
              <div className="bg-slate-50 dark:bg-[#151521] p-4 rounded-xl space-y-3 border border-slate-200/60 dark:border-transparent shadow-sm">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <Award size={20} className="text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{totalSelesai}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Telah Selesai</p>
                </div>
                <p className="text-[10px] text-indigo-500 font-medium">+3% dari bulan lalu</p>
              </div>
            </div>
          </div>

          {/* Universitas Teratas */}
          <div className="bg-white dark:bg-[#1a1c23] p-6 rounded-2xl border border-slate-200/80 dark:border-transparent shadow-sm transition-colors duration-200">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Universitas Teratas</h2>
            <div className="space-y-6">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 text-[11px] font-semibold text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-white/5 pb-3">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Nama Universitas</div>
                <div className="col-span-4">Popularitas</div>
                <div className="col-span-2 text-right">Pendaftar</div>
              </div>
              
              {/* Rows */}
              {[
                { no: "01", name: "Universitas Riau", color: "bg-amber-500", percent: "46%", width: "w-[46%]" },
                { no: "02", name: "UIN Suska Riau", color: "bg-teal-500", percent: "17%", width: "w-[17%]" },
                { no: "03", name: "Universitas Islam Riau", color: "bg-blue-500", percent: "19%", width: "w-[19%]" },
                { no: "04", name: "Universitas Muhammadiyah", color: "bg-rose-400", percent: "29%", width: "w-[29%]" },
              ].map((item) => (
                <div key={item.no} className="grid grid-cols-12 gap-4 items-center text-sm">
                  <div className="col-span-1 font-bold text-slate-800 dark:text-slate-300">{item.no}</div>
                  <div className="col-span-5 text-slate-700 dark:text-slate-300 text-xs font-medium">{item.name}</div>
                  <div className="col-span-4 flex items-center">
                    <div className="w-full h-2 bg-slate-100 dark:bg-[#151521] rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} ${item.width} rounded-full`}></div>
                    </div>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className={`text-[10px] px-2.5 py-1 border border-slate-200 dark:border-white/10 rounded-lg font-bold ${item.color.replace('bg-', 'text-')}`}>
                      {item.percent}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Left Row: Earnings & Visitor Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rasio Diterima */}
            <div className="bg-white dark:bg-[#1a1c23] p-6 rounded-2xl border border-slate-200/80 dark:border-transparent shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[220px] transition-colors duration-200">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Rasio Diterima</h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Total Pendaftar Magang & Penelitian</p>
                <h3 className="text-2xl font-bold text-teal-600 dark:text-[#c5f1e7] mt-3">1,245 Orang</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed w-2/3">Penerimaan 48% Lebih Tinggi dari Bulan Lalu</p>
              </div>
              
              {/* CSS Donut Chart Mockup */}
              <div className="absolute -bottom-8 right-2 w-36 h-36">
                <svg viewBox="0 0 36 36" className="w-full h-full drop-shadow-xl">
                  <path
                    className="text-slate-100 dark:text-[#151521]"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-teal-500 dark:text-[#c5f1e7]"
                    strokeWidth="5"
                    strokeDasharray="80, 100"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-slate-800 dark:text-white mb-2">80%</span>
                </div>
              </div>
            </div>

            {/* Kunjungan Portal */}
            <div className="bg-white dark:bg-[#1a1c23] p-6 rounded-2xl border border-slate-200/80 dark:border-transparent shadow-sm transition-colors duration-200">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Kunjungan Portal</h2>
                <div className="flex items-center gap-1.5 bg-amber-500/10 px-2 py-1 rounded-md">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  <span className="text-[9px] text-amber-600 dark:text-amber-500 font-bold uppercase">
                    Pengunjung Baru
                  </span>
                </div>
              </div>
              
              {/* Area Chart Mockup */}
              <div className="relative h-28 w-full flex items-end">
                 <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0d9488" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,80 Q10,70 20,80 T40,60 T60,20 T80,70 T100,50 T120,40 T140,80 T160,50 T180,60 T200,40 L200,100 L0,100 Z" fill="url(#grad1)" />
                    <path d="M0,80 Q10,70 20,80 T40,60 T60,20 T80,70 T100,50 T120,40 T140,80 T160,50 T180,60 T200,40" fill="none" stroke="#0d9488" strokeWidth="2" />
                    
                    {/* Dot on peak */}
                    <circle cx="60" cy="20" r="3" fill="#fbbf24" stroke="#0d9488" strokeWidth="2" />
                    <line x1="60" y1="20" x2="60" y2="100" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
                 </svg>
                 
                 {/* Y-Axis Labels */}
                 <div className="absolute -left-2 top-0 bottom-6 flex flex-col justify-between text-[8px] text-slate-400">
                   <span>500</span>
                   <span>250</span>
                   <span>0</span>
                 </div>
                 
                 {/* X-Axis Labels */}
                 <div className="absolute bottom-0 left-4 right-0 flex justify-between text-[8px] text-slate-400 pt-2 border-t border-slate-100 dark:border-white/5">
                   <span>Jan</span>
                   <span>Mar</span>
                   <span>May</span>
                   <span>Jul</span>
                   <span>Sep</span>
                   <span>Nov</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Level & Customer Fulfilment) */}
        <div className="space-y-6">
          
          {/* Tingkat Magang */}
          <div className="bg-white dark:bg-[#1a1c23] p-6 rounded-2xl border border-slate-200/80 dark:border-transparent shadow-sm h-[220px] flex flex-col justify-between transition-colors duration-200">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">Tingkat Magang</h2>
            
            {/* Bar Chart Mockup */}
            <div className="flex-1 flex items-end justify-between gap-3 px-2 pt-4">
              {[40, 70, 30, 80, 50, 60, 40].map((h, i) => (
                <div key={i} className="w-full bg-slate-100 dark:bg-[#151521] rounded-t-md relative group h-full flex items-end">
                  <div 
                    className="w-full bg-teal-500 dark:bg-[#c5f1e7] rounded-t-md transition-all duration-300"
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-6">
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-teal-500 dark:bg-[#c5f1e7]"></span>
                 <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Volume</span>
               </div>
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-slate-200 dark:bg-[#151521]"></span>
                 <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Layanan</span>
               </div>
            </div>
          </div>

          {/* Tren Dokumen */}
          <div className="bg-white dark:bg-[#1a1c23] p-6 rounded-2xl border border-slate-200/80 dark:border-transparent shadow-sm h-[280px] flex flex-col justify-between transition-colors duration-200">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Tren Dokumen</h2>
            
            {/* Double Line Chart Mockup */}
            <div className="flex-1 relative w-full flex items-center justify-center py-4">
              <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="w-full h-full absolute inset-0">
                 <defs>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f472b6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
                    </linearGradient>
                 </defs>
                 <path d="M0,40 Q20,30 40,20 T80,40 T120,30 T160,20 T200,40 L200,80 L0,80 Z" fill="url(#grad2)" />
                 <path d="M0,40 Q20,30 40,20 T80,40 T120,30 T160,20 T200,40" fill="none" stroke="#0d9488" strokeWidth="2" />
                 
                 <path d="M0,60 Q20,50 40,70 T80,60 T120,70 T160,50 T200,70" fill="none" stroke="#f472b6" strokeWidth="2" />
                 
                 {[40, 80, 120, 160].map(x => (
                   <circle key={`t-${x}`} cx={x} cy={x === 80 ? 40 : x === 120 ? 30 : 20} r="2.5" fill="#0d9488" />
                 ))}
                 {[40, 80, 120, 160].map(x => (
                   <circle key={`b-${x}`} cx={x} cy={x === 80 ? 60 : x === 120 ? 70 : x === 160 ? 50 : 70} r="2.5" fill="#f472b6" />
                 ))}
              </svg>
            </div>
            
            <div className="flex items-center justify-between mt-4 border-t border-slate-100 dark:border-white/5 pt-5">
               <div>
                 <div className="flex items-center gap-1.5 mb-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-[#c5f1e7]"></span>
                   <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Bulan Lalu</span>
                 </div>
                 <p className="text-sm font-bold text-slate-900 dark:text-white">4,087 Berkas</p>
               </div>
               <div>
                 <div className="flex items-center gap-1.5 mb-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-pink-500 dark:bg-[#f472b6]"></span>
                   <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Bulan Ini</span>
                 </div>
                 <p className="text-sm font-bold text-slate-900 dark:text-white">5,506 Berkas</p>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

