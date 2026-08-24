"use client";

import { useState } from "react";
import { usePersistentData, PenelitianData } from "@/hooks/usePersistentData";
import { 
  BookOpen, 
  Search, 
  Plus, 
  Trash2, 
  Filter, 
  X, 
  PlusCircle, 
  Building2, 
  FileText,
  Calendar,
  Edit3,
  FileDown,
  Eye,
  Info
} from "lucide-react";

export default function PenelitianPage() {
  const { penelitianList, addPenelitian, updatePenelitian, deletePenelitian, isLoaded } = usePersistentData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<PenelitianData | null>(null);

  // Form State
  const [nama, setNama] = useState("");
  const [institusi, setInstitusi] = useState("");
  const [judulPenelitian, setJudulPenelitian] = useState("");
  const [periodeMulai, setPeriodeMulai] = useState("");
  const [periodeSelesai, setPeriodeSelesai] = useState("");
  const [status, setStatus] = useState<"Disetujui" | "Ditinjau" | "Ditolak">("Disetujui");

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-10 h-10 border-4 border-[#c5f1e7] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const resetForm = () => {
    setNama("");
    setInstitusi("");
    setJudulPenelitian("");
    setPeriodeMulai("");
    setPeriodeSelesai("");
    setStatus("Disetujui");
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleOpenEdit = (item: PenelitianData) => {
    setEditingId(item.id);
    setNama(item.nama);
    setInstitusi(item.institusi);
    setJudulPenelitian(item.judulPenelitian);
    setPeriodeMulai(item.periodeMulai);
    setPeriodeSelesai(item.periodeSelesai);
    setStatus(item.status);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !institusi || !judulPenelitian || !periodeMulai || !periodeSelesai) {
      alert("Harap lengkapi semua bidang formulir!");
      return;
    }

    if (editingId) {
      updatePenelitian(editingId, {
        nama,
        institusi,
        judulPenelitian,
        periodeMulai,
        periodeSelesai,
        status,
      });
    } else {
      addPenelitian({
        nama,
        institusi,
        judulPenelitian,
        periodeMulai,
        periodeSelesai,
        status,
      });
    }

    resetForm();
  };

  const handleGeneratePDF = (item: PenelitianData) => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Surat Izin Penelitian - ${item.nama}</title>
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
          .header img.logo-left {
            width: 70px;
            height: auto;
          }
          .header img.logo-right {
            width: 90px;
            height: auto;
          }
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
          .content {
            line-height: 1.8;
            font-size: 13px;
          }
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
          .signature-space {
            height: 70px;
          }
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
          <h3>SURAT KETERANGAN REKOMENDASI PENELITIAN</h3>
          <p>Nomor: 070/RSJ-LITBANG/${new Date().getFullYear()}/${item.id.replace("p-", "")}</p>
        </div>

        <div class="content">
          <p>Menindaklanjuti permohonan izin penelitian/riset ilmiah di lingkungan Rumah Sakit Jiwa Tampan Provinsi Riau, dengan ini menerangkan data peneliti sebagai berikut:</p>
          
          <table class="details-table">
            <tr>
              <td class="label">Nama Peneliti</td>
              <td>: <strong>${item.nama}</strong></td>
            </tr>
            <tr>
              <td class="label">Asal Lembaga / Institusi</td>
              <td>: ${item.institusi}</td>
            </tr>
            <tr>
              <td class="label">Judul Penelitian</td>
              <td>: <em>"${item.judulPenelitian}"</em></td>
            </tr>
            <tr>
              <td class="label">Periode Penelitian</td>
              <td>: ${item.periodeMulai} s/d ${item.periodeSelesai}</td>
            </tr>
            <tr>
              <td class="label">Status Permohonan</td>
              <td>: <span class="status-badge">${item.status}</span></td>
            </tr>
          </table>

          <p>Berdasarkan hasil penelaahan komite etik & telaah berkas, yang bersangkutan <strong>DIBERIKAN IZIN</strong> untuk melaksanakan pengambilan data / observasi penelitian sesuai dengan protokol dan kode etik kerahasiaan data medis RSJ Tampan.</p>
          <p>Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>
        </div>

        <div class="footer">
          <div></div>
          <div class="signature-box">
            <p>Pekanbaru, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p>Ketua Tim Riset & Litbang RSJ</p>
            <div class="signature-space"></div>
            <p><strong><u>Dr. dr. H. Syamsudin, Sp.KJ</u></strong></p>
            <p>NIP. 19720315 200003 1 004</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Gunakan iframe tersembunyi agar tidak merusak session/tab dashboard
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

  const filteredData = penelitianList.filter((item) => {
    const matchesSearch = 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.institusi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.judulPenelitian.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFilter = statusFilter === "Semua" || item.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#1a1c23] p-6 rounded-2xl border border-slate-200/80 dark:border-transparent shadow-sm transition-colors duration-200">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-[#c5f1e7]">
              <BookOpen size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Data Penelitian & Riset</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Kelola data permohonan riset ilmiah & observasi di RSJ Tampan.</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            if (isFormOpen) {
              resetForm();
            } else {
              setIsFormOpen(true);
            }
          }}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md ${
            isFormOpen 
              ? "bg-slate-100 dark:bg-[#151521] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800" 
              : "bg-teal-600 hover:bg-teal-700 text-white dark:bg-[#c5f1e7] dark:text-[#1a1c23] dark:hover:bg-[#aeead9]"
          }`}
        >
          {isFormOpen ? <X size={16} /> : <Plus size={16} />}
          <span>{isFormOpen ? "Tutup Form" : "Tambah Peneliti Baru"}</span>
        </button>
      </div>

      {/* Form Card (Expandable) */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1a1c23] border border-slate-200/80 dark:border-white/5 rounded-2xl shadow-sm p-6 md:p-8 space-y-6 animate-slideDown transition-colors duration-200">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-4">
            {editingId ? <Edit3 size={20} className="text-teal-600 dark:text-[#c5f1e7]" /> : <PlusCircle size={20} className="text-teal-600 dark:text-[#c5f1e7]" />}
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {editingId ? "Perbarui Data Pengajuan Riset" : "Formulir Pengajuan Penelitian Baru"}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Nama Peneliti</label>
              <input
                type="text"
                placeholder="Contoh: Dr. Farah Anindya"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#151521] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition-all"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Asal Institusi / Lembaga</label>
              <input
                type="text"
                placeholder="Contoh: Universitas Abdurrab / BRIN"
                value={institusi}
                onChange={(e) => setInstitusi(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#151521] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Judul Penelitian / Riset</label>
              <input
                type="text"
                placeholder="Contoh: Analisis Kebutuhan Terapi Okupasi bagi Pasien Rawat Inap..."
                value={judulPenelitian}
                onChange={(e) => setJudulPenelitian(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#151521] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Periode Mulai</label>
              <input
                type="date"
                value={periodeMulai}
                onChange={(e) => setPeriodeMulai(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#151521] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Periode Selesai</label>
              <input
                type="date"
                value={periodeSelesai}
                onChange={(e) => setPeriodeSelesai(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#151521] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Status Pengajuan Berkas</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#151521] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition-all"
              >
                <option value="Disetujui" className="bg-white dark:bg-[#1a1c23]">Disetujui</option>
                <option value="Ditinjau" className="bg-white dark:bg-[#1a1c23]">Ditinjau</option>
                <option value="Ditolak" className="bg-white dark:bg-[#1a1c23]">Ditolak</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 bg-slate-100 dark:bg-[#151521] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl text-sm font-semibold transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white dark:bg-[#c5f1e7] dark:hover:bg-[#aeead9] dark:text-[#1a1c23] rounded-xl text-sm font-bold transition-all shadow-md shadow-teal-500/20"
            >
              {editingId ? "Simpan Perubahan" : "Simpan Penelitian"}
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-[#1a1c23] p-4 rounded-2xl border border-slate-200/80 dark:border-white/5 shadow-sm transition-colors duration-200">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Cari berdasarkan nama peneliti, institusi, judul penelitian..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#151521] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 text-sm transition-all"
          />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-[#151521] border border-slate-200 dark:border-white/10 rounded-xl">
            <Filter size={16} className="text-teal-600 dark:text-[#c5f1e7]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-700 dark:text-slate-300 py-1.5 pr-2 text-sm focus:outline-none cursor-pointer"
            >
              <option value="Semua" className="bg-white dark:bg-[#1a1c23]">Semua Status</option>
              <option value="Disetujui" className="bg-white dark:bg-[#1a1c23]">Disetujui</option>
              <option value="Ditinjau" className="bg-white dark:bg-[#1a1c23]">Ditinjau</option>
              <option value="Ditolak" className="bg-white dark:bg-[#1a1c23]">Ditolak</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-[#1a1c23] rounded-2xl border border-slate-200/80 dark:border-white/5 shadow-sm overflow-hidden transition-colors duration-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#151521]/60 border-b border-slate-200/80 dark:border-white/5 text-slate-500 dark:text-slate-400">
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider">Nama & Institusi</th>
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider">Judul Penelitian</th>
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider">Periode Riset</th>
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider">Status Berkas</th>
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-5">
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-[#c5f1e7] transition-colors">{item.nama}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <Building2 size={13} className="text-slate-400 dark:text-slate-500" />
                        <span>{item.institusi}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-sm text-slate-700 dark:text-slate-300 max-w-sm">
                      <div className="flex items-start gap-2">
                        <FileText size={15} className="text-teal-600 dark:text-[#c5f1e7] mt-0.5 shrink-0" />
                        <span className="line-clamp-2" title={item.judulPenelitian}>{item.judulPenelitian}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <Calendar size={13} className="text-slate-400 dark:text-slate-500" />
                        <span>{item.periodeMulai} s/d {item.periodeSelesai}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full inline-block ${
                        item.status === "Disetujui" 
                          ? "bg-teal-50 text-teal-700 dark:bg-[#c5f1e7]/10 dark:text-[#c5f1e7] border border-teal-500/20" :
                        item.status === "Ditolak" 
                          ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-500/20" 
                          : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-500/20"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-all border border-indigo-500/20"
                          title="Lihat Selengkapnya"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleGeneratePDF(item)}
                          className="p-2 rounded-lg bg-teal-50 dark:bg-[#c5f1e7]/10 text-teal-700 dark:text-[#c5f1e7] hover:bg-teal-100 dark:hover:bg-[#c5f1e7]/20 transition-all border border-teal-500/20"
                          title="Cetak Surat Izin Riset"
                        >
                          <FileDown size={16} />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all border border-blue-500/20"
                          title="Ubah Data"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Yakin ingin menghapus data riset "${item.nama}"?`)) {
                              deletePenelitian(item.id);
                            }
                          }}
                          className="p-2 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all border border-rose-500/20"
                          title="Hapus Data"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">
                    <BookOpen size={36} className="mx-auto text-slate-400 mb-3 opacity-50" />
                    <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">Tidak ada data penelitian</p>
                    <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter status.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Selengkapnya */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-[#1a1c23] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 flex flex-col max-h-[90vh] animate-slideDown">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#151521]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Info size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Detail Penelitian</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Informasi lengkap pengajuan riset ilmiah.</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nama Peneliti</label>
                      <div className="mt-1 font-medium text-slate-900 dark:text-white text-base">{selectedItem.nama}</div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Institusi / Lembaga</label>
                      <div className="mt-1 font-medium text-slate-900 dark:text-white flex items-center gap-2">
                        <Building2 size={16} className="text-slate-400" />
                        {selectedItem.institusi}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status Berkas</label>
                      <div className="mt-2">
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full inline-block ${
                          selectedItem.status === "Disetujui" 
                            ? "bg-teal-50 text-teal-700 dark:bg-[#c5f1e7]/10 dark:text-[#c5f1e7] border border-teal-500/20" :
                          selectedItem.status === "Ditolak" 
                            ? "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-500/20" 
                            : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-500/20"
                        }`}>
                          {selectedItem.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Periode Riset</label>
                      <div className="mt-1 font-medium text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                        <Calendar size={16} className="text-slate-400" />
                        {selectedItem.periodeMulai} <span className="text-slate-400 mx-1">s/d</span> {selectedItem.periodeSelesai}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Judul Penelitian</label>
                  <div className="mt-2 p-4 bg-slate-50 dark:bg-[#151521] rounded-xl border border-slate-100 dark:border-white/5 text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {selectedItem.judulPenelitian}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-[#151521] flex justify-end gap-3">
              <button
                onClick={() => {
                  handleGeneratePDF(selectedItem);
                }}
                className="px-5 py-2.5 bg-white dark:bg-[#1a1c23] border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
              >
                <FileDown size={16} />
                Cetak PDF
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white dark:bg-[#c5f1e7] dark:hover:bg-[#aeead9] dark:text-[#1a1c23] rounded-xl text-sm font-bold transition-all shadow-md"
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
