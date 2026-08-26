"use client";

import { useState } from "react";
import Link from "next/link";
import { UploadCloud, File as FileIcon, Check, AlertCircle } from "lucide-react";
import { usePersistentData, MagangData } from "@/hooks/usePersistentData";
import { useRouter } from "next/navigation";


export default function PengajuanPage() {
  const router = useRouter();
  const { addMagang, addPenelitian } = usePersistentData();

  const [fileData, setFileData] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);

  // Form fields
  const [tipePengajuan, setTipePengajuan] = useState<"magang" | "peneliti">("magang");
  const [noTelepon, setNoTelepon] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [judulKegiatan, setJudulKegiatan] = useState("");
  const [periodeMulai, setPeriodeMulai] = useState("");
  const [periodeSelesai, setPeriodeSelesai] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileRead = (f: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setFileData(reader.result as string);
    };
    reader.readAsDataURL(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selected = e.dataTransfer.files[0];
      setFile(selected);
      handleFileRead(selected);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Mohon unggah dokumen persyaratan terlebih dahulu!");
      return;
    }
    if (!jurusan || !judulKegiatan || !periodeMulai || !periodeSelesai) {
      alert("Mohon lengkapi semua isian formulir!");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (tipePengajuan === "magang") {
        addMagang({
          nama: "Budi Santoso",
          universitas: "Universitas Riau",
          jurusan: jurusan,
          periodeMulai: periodeMulai,
          periodeSelesai: periodeSelesai,
          unitKerja: judulKegiatan,
          status: "Menunggu",
          fileName: file?.name,
          fileData: fileData,
        });
      } else {
        addPenelitian({
          nama: "Budi Santoso",
          institusi: "Universitas Riau",
          judulPenelitian: judulKegiatan,
          periodeMulai: periodeMulai,
          periodeSelesai: periodeSelesai,
          status: "Ditinjau",
          fileName: file?.name,
          fileData: fileData,
        });
      }

      setIsSubmitting(false);
      alert("Pengajuan berhasil dikirim! Data Anda akan muncul di halaman Admin untuk diverifikasi.");
      router.push("/portal");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <Link href="/portal" className="text-sm font-semibold text-teal-600 hover:underline mb-2 inline-block">
          &larr; Kembali ke Beranda
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Buat Pengajuan Baru</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Lengkapi form di bawah ini dan unggah berkas yang diperlukan.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Section: Tipe Pengajuan */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">
              1. Tipe Pengajuan
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTipePengajuan("magang")}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  tipePengajuan === "magang"
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                <p className="font-bold text-sm">🎓 Anak Magang</p>
                <p className="text-[10px] mt-1 opacity-70">PKL / Magang / Kerja Praktik</p>
              </button>
              <button
                type="button"
                onClick={() => setTipePengajuan("peneliti")}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  tipePengajuan === "peneliti"
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400"
                    : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                <p className="font-bold text-sm">🔬 Penelitian</p>
                <p className="text-[10px] mt-1 opacity-70">Riset / Skripsi / Tesis</p>
              </button>
            </div>
          </div>
          
          {/* Section: Data Diri */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">
              2. Informasi Tambahan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">No. Telepon / WhatsApp</label>
                <input 
                  type="text" 
                  required
                  value={noTelepon}
                  onChange={(e) => setNoTelepon(e.target.value)}
                  placeholder="0812xxxx" 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Jurusan / Program Studi</label>
                <input 
                  type="text" 
                  required
                  value={jurusan}
                  onChange={(e) => setJurusan(e.target.value)}
                  placeholder="Ilmu Komputer" 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm dark:text-white"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                  {tipePengajuan === "magang" ? "Unit Penempatan yang Diinginkan" : "Judul Penelitian"}
                </label>
                <input 
                  type="text" 
                  required
                  value={judulKegiatan}
                  onChange={(e) => setJudulKegiatan(e.target.value)}
                  placeholder={tipePengajuan === "magang" ? "Instalasi Rehabilitasi" : "Analisis Tingkat Kepuasan..."} 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Periode Mulai</label>
                <input 
                  type="date" 
                  required
                  value={periodeMulai}
                  onChange={(e) => setPeriodeMulai(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Periode Selesai</label>
                <input 
                  type="date" 
                  required
                  value={periodeSelesai}
                  onChange={(e) => setPeriodeSelesai(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Section: Upload Berkas */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-200 border-b border-slate-100 dark:border-slate-800 pb-2">
              3. Unggah Dokumen Persyaratan
            </h2>
            <div className="bg-teal-50 dark:bg-teal-900/10 border border-teal-100 dark:border-teal-800/50 rounded-xl p-4 flex gap-3 text-sm text-teal-800 dark:text-teal-300">
              <AlertCircle size={20} className="shrink-0 mt-0.5 text-teal-600" />
              <p>Mohon jadikan satu berkas PDF yang berisi: <strong>Surat Pengantar Kampus, Proposal (Jika Ada), KTP, dan Pas Foto</strong>. Maksimal ukuran file 5MB.</p>
            </div>

            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="mt-2 flex justify-center rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 px-6 py-10 hover:border-teal-500 dark:hover:border-teal-500 hover:bg-teal-50/50 dark:hover:bg-teal-900/10 transition-colors cursor-pointer group"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <div className="text-center">
                {file ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-3">
                      <FileIcon size={24} />
                    </div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{file.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button 
                      type="button" 
                      className="mt-4 text-xs font-bold text-rose-600 hover:text-rose-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                        setFileData(undefined);
                      }}
                    >
                      Batal Pilih
                    </button>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-600 group-hover:text-teal-500 transition-colors" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-slate-600 dark:text-slate-400 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-semibold text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-600 focus-within:ring-offset-2 hover:text-teal-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span>Pilih file PDF</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf" onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const selected = e.target.files[0];
                            setFile(selected);
                            handleFileRead(selected);
                          }
                        }} />
                      </label>
                      <p className="pl-1">atau drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-slate-500 mt-1">PDF hingga 5MB</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end border-t border-slate-100 dark:border-slate-800 gap-3">
            <Link href="/portal" className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors">
              Batal
            </Link>
            <button 
              type="submit" 
              disabled={isSubmitting || !file}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-teal-600/20 transition-all"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Check size={16} />
              )}
              Kirim Pengajuan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
