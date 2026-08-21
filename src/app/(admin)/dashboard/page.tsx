"use client";

import { usePersistentData } from "@/hooks/usePersistentData";
import { 
  Users, 
  BookOpen, 
  Search, 
  Bell,
  ChevronDown,
  Activity,
  Award
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const { magangList, penelitianList, isLoaded } = usePersistentData();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-10 h-10 border-4 border-[#c5f1e7] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculate statistics (real data mixed with some visual mockups for the charts)
  const totalMagang = magangList.length || 120;
  const totalPenelitian = penelitianList.length || 45;
  const totalSelesai = magangList.filter(m => m.status === "Selesai").length + penelitianList.filter(p => p.status === "Selesai" || p.status === "Disetujui").length || 85;
  const totalPending = magangList.filter(m => m.status === "Menunggu").length + penelitianList.filter(p => p.status === "Ditinjau").length || 12;

  return (
    <div className="space-y-6 animate-fadeIn pb-10 font-sans">
      {/* Top Header Row (Search & Profile) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1a1c23] p-4 rounded-2xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-3 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search here..." 
            className="w-full bg-[#151521] border-none text-sm text-slate-300 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#c5f1e7]"
          />
        </div>
        <div className="flex items-center gap-6">
          <button className="relative text-slate-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#1a1c23]"></span>
          </button>
          <div className="flex items-center gap-3 cursor-pointer">
            <img src="https://ui-avatars.com/api/?name=Admin+User&background=random" className="w-8 h-8 rounded-full border border-slate-700" alt="Profile" />
            <ChevronDown size={16} className="text-slate-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Stats + Top Products + Earnings) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Sales -> Ringkasan Pendaftaran */}
          <div className="bg-[#1a1c23] p-6 rounded-2xl">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white">Ringkasan Pendaftaran</h2>
              <p className="text-xs text-slate-400 mt-1">Data pendaftaran bulan ini</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="bg-[#151521] p-4 rounded-xl space-y-3 shadow-sm shadow-black/20">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Users size={20} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{totalMagang}</h3>
                  <p className="text-[11px] text-slate-400">Total Magang</p>
                </div>
                <p className="text-[10px] text-amber-500 font-medium">+10% dari bulan lalu</p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#151521] p-4 rounded-xl space-y-3 shadow-sm shadow-black/20">
                <div className="w-10 h-10 rounded-full bg-[#c5f1e7]/10 flex items-center justify-center">
                  <BookOpen size={20} className="text-[#c5f1e7]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{totalPenelitian}</h3>
                  <p className="text-[11px] text-slate-400">Total Penelitian</p>
                </div>
                <p className="text-[10px] text-[#c5f1e7] font-medium">+8% dari bulan lalu</p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#151521] p-4 rounded-xl space-y-3 shadow-sm shadow-black/20">
                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center">
                  <Activity size={20} className="text-rose-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{totalPending}</h3>
                  <p className="text-[11px] text-slate-400">Menunggu Review</p>
                </div>
                <p className="text-[10px] text-rose-400 font-medium">+2% dari bulan lalu</p>
              </div>

              {/* Card 4 */}
              <div className="bg-[#151521] p-4 rounded-xl space-y-3 shadow-sm shadow-black/20">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <Award size={20} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{totalSelesai}</h3>
                  <p className="text-[11px] text-slate-400">Telah Selesai</p>
                </div>
                <p className="text-[10px] text-indigo-400 font-medium">+3% dari bulan lalu</p>
              </div>
            </div>
          </div>

          {/* Top Products -> Universitas Teratas */}
          <div className="bg-[#1a1c23] p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-6">Universitas Teratas</h2>
            <div className="space-y-6">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 text-[11px] font-semibold text-slate-500 border-b border-white/5 pb-3">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Nama Universitas</div>
                <div className="col-span-4">Popularitas</div>
                <div className="col-span-2 text-right">Pendaftar</div>
              </div>
              
              {/* Rows */}
              {[
                { no: "01", name: "Universitas Riau", color: "bg-amber-500", percent: "46%", width: "w-[46%]" },
                { no: "02", name: "UIN Suska Riau", color: "bg-[#c5f1e7]", percent: "17%", width: "w-[17%]" },
                { no: "03", name: "Universitas Islam Riau", color: "bg-blue-500", percent: "19%", width: "w-[19%]" },
                { no: "04", name: "Universitas Muhammadiyah", color: "bg-rose-400", percent: "29%", width: "w-[29%]" },
              ].map((item) => (
                <div key={item.no} className="grid grid-cols-12 gap-4 items-center text-sm">
                  <div className="col-span-1 font-bold text-slate-300">{item.no}</div>
                  <div className="col-span-5 text-slate-300 text-xs">{item.name}</div>
                  <div className="col-span-4 flex items-center">
                    <div className="w-full h-1 bg-[#151521] rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} ${item.width}`}></div>
                    </div>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className={`text-[10px] px-2.5 py-1 border border-white/10 rounded font-bold ${item.color.replace('bg-', 'text-')}`}>
                      {item.percent}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Left Row: Earnings & Visitor Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings -> Rasio Kelulusan */}
            <div className="bg-[#1a1c23] p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
              <div>
                <h2 className="text-base font-bold text-white">Rasio Diterima</h2>
                <p className="text-[11px] text-slate-400 mt-1">Total Pendaftar Magang & Penelitian</p>
                <h3 className="text-2xl font-bold text-[#c5f1e7] mt-3">1,245 Orang</h3>
                <p className="text-[10px] text-slate-500 mt-1 leading-relaxed w-2/3">Penerimaan 48% Lebih Tinggi dari Bulan Lalu</p>
              </div>
              
              {/* CSS Donut Chart Mockup */}
              <div className="absolute -bottom-8 right-2 w-36 h-36">
                <svg viewBox="0 0 36 36" className="w-full h-full drop-shadow-2xl">
                  <path
                    className="text-[#151521]"
                    strokeWidth="5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#c5f1e7]"
                    strokeWidth="5"
                    strokeDasharray="80, 100"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-white mb-2">80%</span>
                </div>
              </div>
            </div>

            {/* Visitor Insights -> Kunjungan Portal */}
            <div className="bg-[#1a1c23] p-6 rounded-2xl">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-base font-bold text-white">Kunjungan Portal</h2>
                <div className="flex items-center gap-1.5 bg-amber-500/10 px-2 py-1 rounded">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  <span className="text-[9px] text-amber-500 font-bold uppercase">
                    Pengunjung Baru
                  </span>
                </div>
              </div>
              
              {/* Area Chart Mockup */}
              <div className="relative h-28 w-full flex items-end">
                 {/* This is a simple mockup using an SVG path */}
                 <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="w-full h-full">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#c5f1e7" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#c5f1e7" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,80 Q10,70 20,80 T40,60 T60,20 T80,70 T100,50 T120,40 T140,80 T160,50 T180,60 T200,40 L200,100 L0,100 Z" fill="url(#grad1)" />
                    <path d="M0,80 Q10,70 20,80 T40,60 T60,20 T80,70 T100,50 T120,40 T140,80 T160,50 T180,60 T200,40" fill="none" stroke="#c5f1e7" strokeWidth="2" />
                    
                    {/* Dot on peak */}
                    <circle cx="60" cy="20" r="3" fill="#fbbf24" stroke="#1a1c23" strokeWidth="2" />
                    <line x1="60" y1="20" x2="60" y2="100" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2,2" opacity="0.5" />
                 </svg>
                 
                 {/* Y-Axis Labels */}
                 <div className="absolute -left-2 top-0 bottom-6 flex flex-col justify-between text-[8px] text-slate-500">
                   <span>500</span>
                   <span>250</span>
                   <span>0</span>
                 </div>
                 
                 {/* X-Axis Labels */}
                 <div className="absolute bottom-0 left-4 right-0 flex justify-between text-[8px] text-slate-500 pt-2 border-t border-white/5">
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
          
          {/* Level -> Tingkat Pendaftar */}
          <div className="bg-[#1a1c23] p-6 rounded-2xl h-[220px] flex flex-col justify-between">
            <h2 className="text-base font-bold text-white mb-2">Tingkat Magang</h2>
            
            {/* Bar Chart Mockup */}
            <div className="flex-1 flex items-end justify-between gap-3 px-2 pt-4">
              {[40, 70, 30, 80, 50, 60, 40].map((h, i) => (
                <div key={i} className="w-full bg-[#151521] rounded-sm relative group h-full flex items-end">
                  {/* Overlay Tooltip-like effect */}
                  <div 
                    className="w-full bg-[#c5f1e7] rounded-sm transition-all duration-300"
                    style={{ height: `${h}%` }}
                  ></div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-6">
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-[#c5f1e7]"></span>
                 <span className="text-[10px] text-slate-400 font-medium">Volume</span>
               </div>
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-[#151521]"></span>
                 <span className="text-[10px] text-slate-400 font-medium">Layanan</span>
               </div>
            </div>
          </div>

          {/* Customer Fulfilment -> Tren Dokumen */}
          <div className="bg-[#1a1c23] p-6 rounded-2xl h-[280px] flex flex-col justify-between">
            <h2 className="text-base font-bold text-white mb-4">Tren Dokumen</h2>
            
            {/* Double Line Chart Mockup */}
            <div className="flex-1 relative w-full flex items-center justify-center py-4">
              <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="w-full h-full absolute inset-0">
                 {/* Top line (Pink/Purple) */}
                 <defs>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f472b6" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
                    </linearGradient>
                 </defs>
                 <path d="M0,40 Q20,30 40,20 T80,40 T120,30 T160,20 T200,40 L200,80 L0,80 Z" fill="url(#grad2)" />
                 <path d="M0,40 Q20,30 40,20 T80,40 T120,30 T160,20 T200,40" fill="none" stroke="#c5f1e7" strokeWidth="2" />
                 
                 {/* Bottom line (Teal/Green) */}
                 <path d="M0,60 Q20,50 40,70 T80,60 T120,70 T160,50 T200,70" fill="none" stroke="#f472b6" strokeWidth="2" />
                 
                 {/* Dots on nodes */}
                 {[40, 80, 120, 160].map(x => (
                   <circle key={`t-${x}`} cx={x} cy={x === 80 ? 40 : x === 120 ? 30 : 20} r="2.5" fill="#c5f1e7" />
                 ))}
                 {[40, 80, 120, 160].map(x => (
                   <circle key={`b-${x}`} cx={x} cy={x === 80 ? 60 : x === 120 ? 70 : x === 160 ? 50 : 70} r="2.5" fill="#f472b6" />
                 ))}
              </svg>
            </div>
            
            <div className="flex items-center justify-between mt-4 border-t border-white/5 pt-5">
               <div>
                 <div className="flex items-center gap-1.5 mb-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-[#c5f1e7]"></span>
                   <span className="text-[10px] text-slate-400 font-medium">Bulan Lalu</span>
                 </div>
                 <p className="text-sm font-bold text-white">4,087 Berkas</p>
               </div>
               <div>
                 <div className="flex items-center gap-1.5 mb-1.5">
                   <span className="w-1.5 h-1.5 rounded-full bg-[#f472b6]"></span>
                   <span className="text-[10px] text-slate-400 font-medium">Bulan Ini</span>
                 </div>
                 <p className="text-sm font-bold text-white">5,506 Berkas</p>
               </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
