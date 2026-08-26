"use client";

import { useState } from "react";
import Link from "next/link";
import { usePersistentData, MagangData, PenelitianData } from "@/hooks/usePersistentData";
import { 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Upload,
  Info,
  Clock,
  XCircle,
  FileDown,
  Download,
  X,
  Printer
} from "lucide-react";

type AppEntry = {
  id: string;
  tipe: "Anak Magang" | "Penelitian";
  judul: string;
  status: "menunggu" | "disetujui" | "ditolak" | "selesai";
  statusLabel: string;
  periode: string;
  raw: MagangData | PenelitianData;
};

export default function PortalPage() {
  const { magangList, penelitianList, isLoaded } = usePersistentData();
  const [selectedDetail, setSelectedDetail] = useState<AppEntry | null>(null);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Filter data yang milik user ini (hardcoded "Budi Santoso" untuk demo)
  const myMagang = magangList.filter(m => m.nama === "Budi Santoso");
  const myPenelitian = penelitianList.filter(p => p.nama === "Budi Santoso");
  const allApplications: AppEntry[] = [
    ...myMagang.map(m => ({
      id: m.id,
      tipe: "Anak Magang" as const,
      judul: `${m.jurusan} - ${m.unitKerja}`,
      status: m.status === "Menunggu" ? "menunggu" as const
        : m.status === "Ditolak" ? "ditolak" as const
        : m.status === "Selesai" ? "selesai" as const
        : "disetujui" as const,
      statusLabel: m.status,
      periode: `${m.periodeMulai} s/d ${m.periodeSelesai}`,
      raw: m,
    })),
    ...myPenelitian.map(p => ({
      id: p.id,
      tipe: "Penelitian" as const,
      judul: p.judulPenelitian,
      status: p.status === "Ditinjau" ? "menunggu" as const
        : p.status === "Disetujui" ? "disetujui" as const
        : "ditolak" as const,
      statusLabel: p.status,
      periode: `${p.periodeMulai} s/d ${p.periodeSelesai}`,
      raw: p,
    })),
  ];

  const hasApplication = allApplications.length > 0;

  // Determine current step based on app status
  const getStepNumber = (status: string): number => {
    switch (status) {
      case "menunggu": return 2;
      case "disetujui": return 4;
      case "ditolak": return 2;
      case "selesai": return 4;
      default: return 1;
    }
  };

  // Get the "best" status to show on the flow indicator
  const bestApp = allApplications.length > 0
    ? allApplications.reduce((best, curr) => getStepNumber(curr.status) > getStepNumber(best.status) ? curr : best)
    : null;
  const currentStep = bestApp ? getStepNumber(bestApp.status) : 1;
  const isRejected = bestApp?.status === "ditolak";

  const getStatusBadge = (status: string, label: string) => {
    switch (status) {
      case "menunggu":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 uppercase tracking-wider">
            <Clock size={12} /> {label}
          </span>
        );
      case "disetujui":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 uppercase tracking-wider">
            <CheckCircle size={12} /> {label}
          </span>
        );
      case "ditolak":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 uppercase tracking-wider">
            <XCircle size={12} /> {label}
          </span>
        );
      case "selesai":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 uppercase tracking-wider">
            <CheckCircle size={12} /> {label}
          </span>
        );
      default:
        return null;
    }
  };

  // Generate and print acceptance letter for approved apps
  const handlePrintSurat = (app: AppEntry) => {
    const raw = app.raw;
    const isMagang = app.tipe === "Anak Magang";
    const m = isMagang ? raw as MagangData : null;
    const p = !isMagang ? raw as PenelitianData : null;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Surat ${isMagang ? 'Penerimaan Magang' : 'Izin Penelitian'} - ${raw.nama}</title>
        <style>
          @page { size: A4; margin: 20mm; }
          body {
            font-family: 'Times New Roman', Times, serif, Arial, sans-serif;
            color: #111827;
            padding: 20px;
            max-width: 750px;
            margin: 0 auto;
            background: white;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 3px double #111827;
            padding-bottom: 12px;
            margin-bottom: 25px;
          }
          .header-text {
            text-align: center;
            flex: 1;
            padding: 0 15px;
          }
          .header img.logo-left { width: 70px; height: auto; }
          .header img.logo-right { width: 90px; height: auto; }
          .header-text h2 { margin: 0; font-size: 16px; font-weight: normal; }
          .header-text h1 { margin: 4px 0; font-size: 17px; font-weight: bold; }
          .header-text p { margin: 2px 0; font-size: 11px; color: #111827; }
          .doc-title {
            text-align: center;
            margin: 25px 0 20px 0;
          }
          .doc-title h3 {
            margin: 0;
            text-decoration: underline;
            font-size: 15px;
            text-transform: uppercase;
            font-weight: bold;
          }
          .doc-title p { margin: 4px 0; font-size: 12px; }
          .content { line-height: 1.8; font-size: 13px; }
          .details-table {
            width: 100%;
            margin: 20px 0;
            border-collapse: collapse;
          }
          .details-table td {
            padding: 6px 4px;
            vertical-align: top;
            font-size: 13px;
          }
          .details-table td.label {
            width: 32%;
            font-weight: bold;
          }
          .status-badge {
            display: inline-block;
            padding: 2px 8px;
            border: 1px solid #15803d;
            border-radius: 4px;
            font-weight: bold;
            font-size: 11px;
            background: #dcfce7;
            color: #15803d;
          }
          .footer {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
          }
          .signature-box {
            text-align: center;
            width: 250px;
            font-size: 13px;
          }
          .signature-space { height: 70px; }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="/OIP.webp" class="logo-left" alt="Logo Riau" />
          <div class="header-text">
            <h2>PEMERINTAH PROVINSI RIAU</h2>
            <h1>UPT. BERSIFAT KHUSUS RUMAH SAKIT JIWA TAMPAN<br/>PADA DINAS KESEHATAN PROVINSI RIAU</h1>
            <p>Jl. H.R. Subrantas Km 12,5 Pekanbaru Telp. (0761) 63240 Fax. (0761) 63239</p>
          </div>
          <img src="/OIP.jpg" class="logo-right" alt="Logo RSJ" />
        </div>

        <div class="doc-title">
          <h3>SURAT KETERANGAN ${isMagang ? 'PENERIMAAN MAGANG' : 'REKOMENDASI PENELITIAN'}</h3>
          <p>Nomor: 070/RSJ-${isMagang ? 'MAGANG' : 'LITBANG'}/${new Date().getFullYear()}/${raw.id.replace(/^[mp]-/, "")}</p>
        </div>

        <div class="content">
          <p>${isMagang 
            ? 'Menindaklanjuti permohonan izin magang / Praktik Kerja Lapangan (PKL) di lingkungan Rumah Sakit Jiwa Tampan Provinsi Riau, dengan ini menerangkan data peserta sebagai berikut:'
            : 'Menindaklanjuti permohonan izin penelitian/riset ilmiah di lingkungan Rumah Sakit Jiwa Tampan Provinsi Riau, dengan ini menerangkan data peneliti sebagai berikut:'
          }</p>

          <table class="details-table">
            <tr>
              <td class="label">Nama ${isMagang ? 'Peserta' : 'Peneliti'}</td>
              <td>: <strong>${raw.nama}</strong></td>
            </tr>
            <tr>
              <td class="label">Asal ${isMagang ? 'Universitas' : 'Lembaga / Institusi'}</td>
              <td>: ${isMagang ? m!.universitas : p!.institusi}</td>
            </tr>
            ${isMagang ? `
            <tr>
              <td class="label">Jurusan / Program Studi</td>
              <td>: ${m!.jurusan}</td>
            </tr>
            <tr>
              <td class="label">Unit Penempatan</td>
              <td>: ${m!.unitKerja}</td>
            </tr>
            ` : `
            <tr>
              <td class="label">Judul Penelitian</td>
              <td>: <em>"${p!.judulPenelitian}"</em></td>
            </tr>
            `}
            <tr>
              <td class="label">Periode ${isMagang ? 'Magang' : 'Penelitian'}</td>
              <td>: ${raw.periodeMulai} s/d ${raw.periodeSelesai}</td>
            </tr>
            <tr>
              <td class="label">Status Permohonan</td>
              <td>: <span class="status-badge">DISETUJUI</span></td>
            </tr>
          </table>

          <p>Berdasarkan hasil telaah berkas yang bersangkutan <strong>DIBERIKAN IZIN</strong> untuk melaksanakan ${isMagang ? 'kegiatan magang / PKL' : 'pengambilan data / observasi penelitian'} sesuai dengan peraturan dan kode etik yang berlaku di RSJ Tampan.</p>
          <p>Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
        </div>

        <div class="footer">
          <div></div>
          <div class="signature-box">
            <p>Pekanbaru, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p>${isMagang ? 'Kepala Bagian Diklat RSJ' : 'Ketua Tim Riset & Litbang RSJ'}</p>
            <div class="signature-space"></div>
            <p><strong><u>Dr.Wilhelm Samto Tamba, S.Tr.Kom</u></strong></p>
            <p>NIP. 19720315 200003 1 004</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(htmlContent);
      doc.close();
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1500);
      }, 500);
    }
  };

  // Step indicator logic
  const stepData = [
    { num: 1, label: "Isi Formulir", desc: "Lengkapi data & unggah berkas PDF persyaratan" },
    { num: 2, label: "Verifikasi Berkas", desc: "Ditinjau oleh Admin & Komite Etik RSJ" },
    { num: 3, label: "Penerbitan Surat", desc: "Surat balasan resmi diterbitkan secara digital" },
    { num: 4, label: "Selesai", desc: "Unduh surat & mulai kegiatan di RSJ" },
  ];

  const getStepStyle = (stepNum: number) => {
    if (isRejected && stepNum >= 2) {
      if (stepNum === 2) return "bg-rose-500 text-white shadow-md shadow-rose-500/20";
      return "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500";
    }
    if (stepNum <= currentStep) {
      return "bg-teal-600 text-white shadow-md shadow-teal-600/20";
    }
    return "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500";
  };

  const getStepLabelStyle = (stepNum: number) => {
    if (isRejected && stepNum === 2) return "text-rose-600 dark:text-rose-400";
    if (stepNum <= currentStep) return "text-slate-800 dark:text-slate-200";
    return "text-slate-500 dark:text-slate-400";
  };

  // Progress bar width based on step
  const progressWidth = isRejected ? "20%" : currentStep === 1 ? "0%" : currentStep === 2 ? "33%" : currentStep === 3 ? "66%" : "100%";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Selamat Datang, Budi!</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Pantau status pengajuan magang atau penelitian Anda di sini.</p>
        </div>
        <Link 
          href="/pengajuan"
          className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-teal-600/20 transition-all"
        >
          <Upload size={16} />
          Buat Pengajuan Baru
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Status Card */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
            <FileText size={16} className="text-teal-600" />
            Status Pengajuan Saya ({allApplications.length})
          </h2>
          
          {hasApplication ? (
            <div className="space-y-3">
              {allApplications.map((app) => (
                <div 
                  key={app.id} 
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 gap-4 transition-all hover:border-teal-300 dark:hover:border-teal-700 group cursor-pointer"
                  onClick={() => setSelectedDetail(app)}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {getStatusBadge(app.status, app.statusLabel)}
                      <span className="text-[10px] text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">{app.tipe}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm group-hover:text-teal-600 transition-colors mt-1">{app.judul}</h3>
                    <p className="text-xs text-slate-500 mt-1">Periode: {app.periode}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {app.status === "menunggu" && (
                      <div className="hidden sm:flex flex-col items-end">
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Estimasi</p>
                        <p className="text-xs text-slate-500">2-3 Hari Kerja</p>
                      </div>
                    )}
                    {app.status === "disetujui" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrintSurat(app);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-md shadow-teal-600/20 transition-all"
                      >
                        <Download size={14} />
                        Unduh Surat
                      </button>
                    )}
                    {app.status === "ditolak" && (
                      <div className="hidden sm:flex flex-col items-end">
                        <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">Ditolak</p>
                        <p className="text-xs text-slate-500">Ajukan ulang</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 px-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                <FileText size={24} />
              </div>
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Belum ada pengajuan</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4 max-w-xs mx-auto">Anda belum membuat pengajuan apapun. Klik tombol di bawah untuk memulai.</p>
              <Link href="/pengajuan" className="inline-block text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline">
                Mulai Pengajuan &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* Info/Guide Card */}
        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-6 shadow-md text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="relative z-10">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
              <Info size={16} />
              Informasi Penting
            </h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-teal-100 mt-0.5 shrink-0" />
                <span className="text-teal-50 leading-tight">Pastikan dokumen berformat PDF (maks. 5MB)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-teal-100 mt-0.5 shrink-0" />
                <span className="text-teal-50 leading-tight">Surat pengantar ditandatangani basah/elektronik oleh kampus</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle size={16} className="text-amber-200 mt-0.5 shrink-0" />
                <span className="text-teal-50 leading-tight">Proses telaah memakan waktu 2-3 hari kerja</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Alur Pengajuan Section - Dynamic */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-8">
          Alur Pengajuan
        </h2>
        <div className="relative">
          {/* Background line */}
          <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-slate-100 dark:bg-slate-800 hidden sm:block"></div>
          {/* Progress line */}
          <div 
            className={`absolute top-5 left-[10%] h-0.5 hidden sm:block transition-all duration-700 ${isRejected ? 'bg-rose-500' : 'bg-teal-500'}`}
            style={{ width: progressWidth }}
          ></div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 relative z-10">
            {stepData.map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-3 border-[6px] border-white dark:border-slate-900 relative z-10 transition-all duration-300 ${getStepStyle(step.num)}`}>
                  {step.num <= currentStep && !isRejected ? (
                    <CheckCircle size={18} />
                  ) : isRejected && step.num === 2 ? (
                    <XCircle size={18} />
                  ) : (
                    step.num
                  )}
                </div>
                <h4 className={`text-xs font-bold transition-colors ${getStepLabelStyle(step.num)}`}>{step.label}</h4>
                <p className="text-[10px] text-slate-500 mt-1 max-w-[120px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Status message below flow */}
        {bestApp && (
          <div className={`mt-8 p-4 rounded-xl border text-sm flex items-start gap-3 ${
            bestApp.status === "disetujui" 
              ? "bg-teal-50 dark:bg-teal-900/10 border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300" 
              : bestApp.status === "ditolak"
              ? "bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300"
              : "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300"
          }`}>
            {bestApp.status === "disetujui" ? (
              <>
                <CheckCircle size={20} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Pengajuan Anda Telah Disetujui! 🎉</p>
                  <p className="text-xs mt-1 opacity-80">Surat penerimaan sudah tersedia. Silakan unduh surat dan bawa saat mulai kegiatan di RSJ Tampan.</p>
                </div>
              </>
            ) : bestApp.status === "ditolak" ? (
              <>
                <XCircle size={20} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Pengajuan Anda Ditolak</p>
                  <p className="text-xs mt-1 opacity-80">Mohon periksa kembali kelengkapan berkas Anda, lalu silakan ajukan ulang melalui tombol "Buat Pengajuan Baru".</p>
                </div>
              </>
            ) : (
              <>
                <Clock size={20} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Pengajuan Sedang Ditinjau</p>
                  <p className="text-xs mt-1 opacity-80">Berkas Anda sedang dalam proses verifikasi oleh Admin RSJ. Estimasi waktu 2-3 hari kerja.</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  selectedDetail.status === "disetujui" ? "bg-teal-100 text-teal-600" :
                  selectedDetail.status === "ditolak" ? "bg-rose-100 text-rose-600" :
                  "bg-amber-100 text-amber-600"
                }`}>
                  <FileText size={18} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Detail Pengajuan</h2>
                  <p className="text-xs text-slate-500">{selectedDetail.tipe}</p>
                </div>
              </div>
              <button onClick={() => setSelectedDetail(null)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all">
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="flex items-center gap-2">
                {getStatusBadge(selectedDetail.status, selectedDetail.statusLabel)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Nama</label>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{selectedDetail.raw.nama}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {selectedDetail.tipe === "Anak Magang" ? "Universitas" : "Institusi"}
                  </label>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                    {'universitas' in selectedDetail.raw ? (selectedDetail.raw as MagangData).universitas : (selectedDetail.raw as PenelitianData).institusi}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {selectedDetail.tipe === "Anak Magang" ? "Jurusan / Unit Kerja" : "Judul Penelitian"}
                </label>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{selectedDetail.judul}</p>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Periode</label>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{selectedDetail.periode}</p>
              </div>

              {/* Status-specific info */}
              {selectedDetail.status === "disetujui" && (
                <div className="bg-teal-50 dark:bg-teal-900/10 border border-teal-200 dark:border-teal-800 rounded-xl p-4">
                  <p className="text-sm font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
                    <CheckCircle size={16} /> Disetujui
                  </p>
                  <p className="text-xs text-teal-600 dark:text-teal-300 mt-1">Surat penerimaan resmi sudah dapat diunduh.</p>
                </div>
              )}
              {selectedDetail.status === "ditolak" && (
                <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 rounded-xl p-4">
                  <p className="text-sm font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                    <XCircle size={16} /> Ditolak
                  </p>
                  <p className="text-xs text-rose-600 dark:text-rose-300 mt-1">Silakan periksa kembali kelengkapan berkas dan ajukan ulang.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
              {selectedDetail.status === "disetujui" && (
                <button
                  onClick={() => handlePrintSurat(selectedDetail)}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <Printer size={14} />
                  Cetak Surat
                </button>
              )}
              {selectedDetail.status === "ditolak" && (
                <Link
                  href="/pengajuan"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <Upload size={14} />
                  Ajukan Ulang
                </Link>
              )}
              <button
                onClick={() => setSelectedDetail(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
