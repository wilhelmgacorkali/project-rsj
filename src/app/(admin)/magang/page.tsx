"use client";

import { useState } from "react";
import { usePersistentData, MagangData } from "@/hooks/usePersistentData";
import { 
  Users, 
  Search, 
  Plus, 
  Trash2, 
  Filter, 
  X, 
  PlusCircle, 
  Building, 
  GraduationCap,
  Calendar,
  Layers,
  Edit3,
  FileDown
} from "lucide-react";

export default function MagangPage() {
  const { magangList, addMagang, updateMagang, deleteMagang, isLoaded } = usePersistentData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [nama, setNama] = useState("");
  const [universitas, setUniversitas] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [periodeMulai, setPeriodeMulai] = useState("");
  const [periodeSelesai, setPeriodeSelesai] = useState("");
  const [unitKerja, setUnitKerja] = useState("");
  const [status, setStatus] = useState<"Aktif" | "Selesai" | "Menunggu">("Aktif");

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-10 h-10 border-4 border-[#c5f1e7] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const resetForm = () => {
    setNama("");
    setUniversitas("");
    setJurusan("");
    setPeriodeMulai("");
    setPeriodeSelesai("");
    setUnitKerja("");
    setStatus("Aktif");
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleOpenEdit = (item: MagangData) => {
    setEditingId(item.id);
    setNama(item.nama);
    setUniversitas(item.universitas);
    setJurusan(item.jurusan);
    setPeriodeMulai(item.periodeMulai);
    setPeriodeSelesai(item.periodeSelesai);
    setUnitKerja(item.unitKerja);
    setStatus(item.status);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !universitas || !jurusan || !periodeMulai || !periodeSelesai || !unitKerja) {
      alert("Harap lengkapi semua bidang formulir!");
      return;
    }

    if (editingId) {
      updateMagang(editingId, {
        nama,
        universitas,
        jurusan,
        periodeMulai,
        periodeSelesai,
        unitKerja,
        status,
      });
    } else {
      addMagang({
        nama,
        universitas,
        jurusan,
        periodeMulai,
        periodeSelesai,
        unitKerja,
        status,
      });
    }

    resetForm();
  };

  const handleGeneratePDF = (item: MagangData) => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Surat Keterangan Magang - ${item.nama}</title>
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
            text-align: center;
            border-bottom: 3px double #111827;
            padding-bottom: 12px;
            margin-bottom: 25px;
          }
          .header h2 { margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; font-weight: normal; }
          .header h1 { margin: 4px 0; font-size: 20px; font-weight: bold; letter-spacing: 0.5px; }
          .header p { margin: 2px 0; font-size: 11px; color: #374151; }
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
            border: 1px solid #0284c7;
            border-radius: 4px;
            font-weight: bold;
            font-size: 11px;
            background: #f0f9ff;
            color: #0284c7;
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
          <h2>Pemerintah Provinsi Riau</h2>
          <h1>RUMAH SAKIT JIWA TAMPAN</h1>
          <p>Jl. H.R. Soebrantas Km. 12.5 Pekanbaru, Riau - Kode Pos: 28293</p>
          <p>Email: rsjtampan@riau.go.id | Telp: (0761) 63240</p>
        </div>

        <div class="doc-title">
          <h3>SURAT KETERANGAN PENERIMAAN MAGANG</h3>
          <p>Nomor: 800/RSJ-DIKLAT/${new Date().getFullYear()}/${item.id.replace("m-", "")}</p>
        </div>

        <div class="content">
          <p>Yang bertanda tangan di bawah ini, Kepala Bagian Diklat & Litbang Rumah Sakit Jiwa Tampan Provinsi Riau, menerangkan bahwa:</p>
          
          <table class="details-table">
            <tr>
              <td class="label">Nama Lengkap</td>
              <td>: <strong>${item.nama}</strong></td>
            </tr>
            <tr>
              <td class="label">Asal Universitas/Sekolah</td>
              <td>: ${item.universitas}</td>
            </tr>
            <tr>
              <td class="label">Jurusan / Program Studi</td>
              <td>: ${item.jurusan}</td>
            </tr>
            <tr>
              <td class="label">Unit Penempatan</td>
              <td>: <strong>${item.unitKerja}</strong></td>
            </tr>
            <tr>
              <td class="label">Periode Pelaksanaan</td>
              <td>: ${item.periodeMulai} s/d ${item.periodeSelesai}</td>
            </tr>
            <tr>
              <td class="label">Status Magang</td>
              <td>: <span class="status-badge">${item.status}</span></td>
            </tr>
          </table>

          <p>Adalah benar telah terdaftar dan diterima untuk melaksanakan kegiatan Praktik Kerja Lapangan (PKL) / Magang di Rumah Sakit Jiwa Tampan Provinsi Riau sesuai dengan ketentuan dan regulasi yang berlaku.</p>
          <p>Demikian surat keterangan ini diterbitkan untuk dipergunakan sebagaimana mestinya.</p>
        </div>

        <div class="footer">
          <div></div>
          <div class="signature-box">
            <p>Pekanbaru, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p>Kepala Instalasi Diklat & Litbang</p>
            <div class="signature-space"></div>
            <p><strong><u>Ns. H. Hendra, S.Kep., M.Kes</u></strong></p>
            <p>NIP. 19780412 200501 1 008</p>
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

  const filteredData = magangList.filter((item) => {
    const matchesSearch = 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.universitas.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.jurusan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unitKerja.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesFilter = statusFilter === "Semua" || item.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1a1c23] p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c5f1e7]/10 flex items-center justify-center text-[#c5f1e7]">
              <Users size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Data Anak Magang</h1>
              <p className="text-xs text-slate-400 mt-0.5">Kelola data mahasiswa & pelajar magang di RSJ Tampan.</p>
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
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${
            isFormOpen 
              ? "bg-[#151521] text-slate-300 hover:bg-slate-800" 
              : "bg-[#c5f1e7] text-[#1a1c23] hover:bg-[#aeead9] shadow-[#c5f1e7]/10"
          }`}
        >
          {isFormOpen ? <X size={16} /> : <Plus size={16} />}
          <span>{isFormOpen ? "Tutup Form" : "Tambah Magang Baru"}</span>
        </button>
      </div>

      {/* Form Card (Expandable) */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-[#1a1c23] border border-white/5 rounded-2xl shadow-xl p-6 md:p-8 space-y-6 animate-slideDown">
          <div className="flex items-center gap-2 border-b border-white/5 pb-4">
            {editingId ? <Edit3 size={20} className="text-[#c5f1e7]" /> : <PlusCircle size={20} className="text-[#c5f1e7]" />}
            <h3 className="text-lg font-bold text-white">
              {editingId ? "Perbarui Data Anak Magang" : "Formulir Pendaftaran Anak Magang"}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Contoh: Budi Santoso"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#151521] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#c5f1e7] focus:ring-1 focus:ring-[#c5f1e7] text-sm transition-all"
              />
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Asal Universitas / Sekolah</label>
              <input
                type="text"
                placeholder="Contoh: Universitas Riau"
                value={universitas}
                onChange={(e) => setUniversitas(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#151521] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#c5f1e7] focus:ring-1 focus:ring-[#c5f1e7] text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Jurusan / Program Studi</label>
              <input
                type="text"
                placeholder="Contoh: Psikologi"
                value={jurusan}
                onChange={(e) => setJurusan(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#151521] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#c5f1e7] focus:ring-1 focus:ring-[#c5f1e7] text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Unit Penempatan</label>
              <input
                type="text"
                placeholder="Contoh: Instalasi Rehabilitasi"
                value={unitKerja}
                onChange={(e) => setUnitKerja(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#151521] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#c5f1e7] focus:ring-1 focus:ring-[#c5f1e7] text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Periode Mulai</label>
              <input
                type="date"
                value={periodeMulai}
                onChange={(e) => setPeriodeMulai(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#151521] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#c5f1e7] focus:ring-1 focus:ring-[#c5f1e7] text-sm transition-all [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Periode Selesai</label>
              <input
                type="date"
                value={periodeSelesai}
                onChange={(e) => setPeriodeSelesai(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#151521] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#c5f1e7] focus:ring-1 focus:ring-[#c5f1e7] text-sm transition-all [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Status Magang</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl bg-[#151521] border border-white/10 text-white focus:outline-none focus:border-[#c5f1e7] focus:ring-1 focus:ring-[#c5f1e7] text-sm transition-all"
              >
                <option value="Aktif" className="bg-[#1a1c23]">Aktif</option>
                <option value="Menunggu" className="bg-[#1a1c23]">Menunggu</option>
                <option value="Selesai" className="bg-[#1a1c23]">Selesai</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 bg-[#151521] hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-sm font-semibold transition-all"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#c5f1e7] hover:bg-[#aeead9] text-[#1a1c23] rounded-xl text-sm font-bold transition-all shadow-md shadow-[#c5f1e7]/10"
            >
              {editingId ? "Simpan Perubahan" : "Simpan Data Magang"}
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-[#1a1c23] p-4 rounded-2xl border border-white/5 shadow-md">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Cari berdasarkan nama, universitas, jurusan, unit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-[#151521] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#c5f1e7] focus:ring-1 focus:ring-[#c5f1e7] text-sm transition-all"
          />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#151521] border border-white/10 rounded-xl">
            <Filter size={16} className="text-[#c5f1e7]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-300 py-1.5 pr-2 text-sm focus:outline-none cursor-pointer"
            >
              <option value="Semua" className="bg-[#1a1c23]">Semua Status</option>
              <option value="Aktif" className="bg-[#1a1c23]">Aktif</option>
              <option value="Menunggu" className="bg-[#1a1c23]">Menunggu</option>
              <option value="Selesai" className="bg-[#1a1c23]">Selesai</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#1a1c23] rounded-2xl border border-white/5 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#151521]/60 border-b border-white/5 text-slate-400">
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider">Nama & Instansi</th>
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider">Jurusan</th>
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider">Unit Penempatan</th>
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider">Periode</th>
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider">Status</th>
                <th className="py-4 px-5 text-xs font-bold uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-4 px-5">
                      <div className="font-semibold text-white group-hover:text-[#c5f1e7] transition-colors">{item.nama}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <GraduationCap size={13} className="text-slate-500" />
                        <span>{item.universitas}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-sm text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Layers size={14} className="text-slate-500" />
                        <span>{item.jurusan}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-sm text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Building size={14} className="text-slate-500" />
                        <span>{item.unitKerja}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-xs text-slate-400">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Calendar size={13} className="text-slate-500" />
                        <span>{item.periodeMulai} s/d {item.periodeSelesai}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-full inline-block ${
                        item.status === "Aktif" 
                          ? "bg-[#c5f1e7]/10 text-[#c5f1e7] border border-[#c5f1e7]/20" :
                        item.status === "Selesai" 
                          ? "bg-slate-500/10 text-slate-300 border border-slate-500/20" 
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleGeneratePDF(item)}
                          className="p-2 hover:bg-[#c5f1e7]/10 text-slate-400 hover:text-[#c5f1e7] rounded-xl transition-all"
                          title="Cetak / Unduh Berkas PDF"
                        >
                          <FileDown size={16} />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-2 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 rounded-xl transition-all"
                          title="Edit Data"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteMagang(item.id)}
                          className="p-2 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-xl transition-all"
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
                  <td colSpan={6} className="py-12 text-center text-slate-500 text-sm">
                    Tidak ditemukan data anak magang yang sesuai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
