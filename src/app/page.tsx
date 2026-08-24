"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Users, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  HeartHandshake,
  Sun,
  Moon,
  Facebook,
  Instagram,
  Youtube
} from "lucide-react";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("magang");
  const [darkMode, setDarkMode] = useState(false);

  // Effect to sync dark mode
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Info Bar */}
      <div className="bg-teal-800 dark:bg-teal-950 text-slate-100 text-xs py-2 px-6 md:px-12 flex flex-col sm:flex-row justify-between gap-2 border-b border-teal-700/30">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1"><Mail size={12} /> rsjtampan@riau.go.id</span>
          <span className="flex items-center gap-1"><Phone size={12} /> (0761) 63264</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin size={12} /> Jl. H.R. Subrantas Km. 12.5 Pekanbaru, Riau
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center p-1 rounded-xl bg-white shadow-md shadow-teal-600/20 w-[130px] h-[70px] relative overflow-hidden">
              <img 
                src="/logo.png" 
                alt="Logo RSJ Tampan" 
                className="object-contain w-full h-full"
              />
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-650 dark:text-slate-350">
            <a href="#profil" className="hover:text-teal-650 transition-colors">PROFIL</a>
            <a href="#layanan" className="hover:text-teal-650 transition-colors">LAYANAN</a>
            <a href="#visi" className="hover:text-teal-650 transition-colors">VISI & MISI</a>
            <a href="#kontak" className="hover:text-teal-650 transition-colors">KONTAK</a>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
            </button>
            <Link 
              href="/login" 
              className="hidden sm:inline-flex text-sm font-bold text-teal-650 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 px-3 py-2"
            >
              Masuk
            </Link>
            <Link 
              href="/register" 
              className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold px-4 md:px-5 py-2 md:py-2.5 rounded-xl transition-all shadow-md shadow-teal-600/20 hover:shadow-lg hover:shadow-teal-600/40 hover:-translate-y-0.5"
            >
              Registrasi
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-16 md:py-24 border-b border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400">
              <ShieldCheck size={14} /> Terakreditasi Paripurna KARS
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Portal Akademik & <br />
              <span className="text-teal-650 dark:text-teal-400">Penelitian RSJ Tampan</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-xl">
              Kami menyambut akademisi, mahasiswa magang, dan peneliti untuk berkolaborasi serta berkontribusi dalam riset kesehatan jiwa terbaik di Provinsi Riau.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3.5 rounded-xl text-base shadow-xl shadow-teal-600/30 hover:shadow-2xl hover:shadow-teal-600/50 hover:-translate-y-1 transform transition-all duration-300"
              >
                <span>Ajukan Magang / Penelitian</span>
                <ArrowRight size={18} />
              </Link>
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 hover:bg-slate-800 text-white font-bold px-6 py-3.5 rounded-xl text-base transition-all"
              >
                <span>Dashboard Admin</span>
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-md h-[320px] md:h-[400px] rounded-3xl bg-gradient-to-tr from-teal-500 to-emerald-450 p-1 shadow-2xl shadow-teal-505/20 rotate-1 flex items-center justify-center text-white text-center relative">
              <div className="absolute inset-0.5 bg-slate-900/90 dark:bg-slate-950/90 rounded-[22px] flex flex-col justify-center p-8 space-y-6">
                <HeartHandshake size={56} className="text-teal-400 mx-auto animate-bounce" />
                <div>
                  <h4 className="text-xl font-bold">Kesehatan Jiwa Anda Kunci Kebahagiaan</h4>
                  <p className="text-sm text-slate-400 mt-2">Mendedikasikan pelayanan kesehatan jiwa prima dengan integritas tinggi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sambutan Direktur Section */}
      <section id="profil" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Foto Direktur */}
            <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-24">
              <div className="relative group w-full max-w-[420px]">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-teal-500/30 to-emerald-500/20 rounded-3xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-850">
                  <img
                    src="/rsj_dir.png"
                    alt="dr. Prima Wulandari - Direktur RSJ Tampan Provinsi Riau"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Teks Sambutan Direktur */}
            <div className="lg:col-span-7 space-y-6 text-slate-700 dark:text-slate-300">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Sambutan Direktur
                </h2>
                <div className="h-1 w-20 bg-teal-600 rounded-full mt-3"></div>
              </div>

              {/* Pantun Pembuka */}
              <div className="italic text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border-l-4 border-teal-500 text-sm leading-relaxed space-y-1">
                <p>Mencari timba si anak dara</p>
                <p>Dibawah sarang burung tempua</p>
                <p>Salam sembah pembuka bicara</p>
                <p>Semoga kita sehat jiwa</p>
              </div>

              {/* Isi Sambutan */}
              <div className="space-y-4 text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-350 text-justify">
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Assalamu&apos;alaikum warahmatullah wabarakatuh...
                </p>
                <p>
                  Kesehatan Jiwa merupakan harmonisasi dalam kehidupan yang tercipta antara fungsi jiwa dengan kemampuan mengatasi problematika, Kesehatan jiwa adalah aspek penting dalam mewujudkan kesehatan secara menyeluruh. Program pemerintah terkait kesehatan jiwa sudah bertransisi dari kuratif dan rehabilitative menjadi promotive preventif. Rumah Sakit Jiwa Pemerintah diharapkan lebih mengarah pada promosi kesehatan jiwa, meningkatkan deteksi dini dan pencegahan, serta manajemen kasus yang lebih baik.
                </p>
                <p>
                  Pemerintah Provinsi Riau berkomitmen untuk mencapai Suistainable Development Goals/SDGs dan Universal Health Coverage (UHC), pelayanan kesehatan mental yang komprehensif menjadi bagian dari SDGs dan UHC.
                </p>
                <p>
                  Rumah Sakit Jiwa Tampan Provinsi Riau sebagai rujukan kesehatan jiwa di wilayah Provinsi Riau mendukung program pemerintah dalam mencapai tujuan Pembangunan berkelanjutan ( Suistainable Development Goals/SDGs) dan Universal Health Coverage ( UHC) untuk mengurangi prevalensi gangguan jiwa di Provinsi Riau.
                </p>
              </div>

              {/* Pantun Penutup */}
              <div className="italic text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border-l-4 border-teal-500 text-sm leading-relaxed space-y-1">
                <p>Masjid alam masjid raya</p>
                <p>Berdiri kokoh di senapelan</p>
                <p>Mari kita sehatkan jiwa</p>
                <p>Demi pembangunan berkelanjutan</p>
              </div>

              {/* Profil Singkat Penutup */}
              <div className="pt-2">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">dr. Prima Wulandari</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Direktur RSJ Tampan Provinsi Riau</p>
              </div>

              <div className="pt-1">
                <a 
                  href="#visi"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 px-4 py-2 rounded-xl transition-all shadow-sm group"
                >
                  <span>Selengkapnya</span>
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="layanan" className="py-20 max-w-7xl mx-auto px-6 text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-3">
          <h3 className="text-xs font-bold text-teal-655 uppercase tracking-widest">Layanan Utama Portal</h3>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Alur Pendaftaran Akademik</h2>
          <p className="text-slate-500 dark:text-slate-450">Kemudahan prosedur pendaftaran magang dan pengajuan penelitian dalam satu platform terintegrasi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 text-left space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-650 flex items-center justify-center">
              <Users size={24} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Pendaftaran Anak Magang</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Ditujukan bagi mahasiswa aktif dari universitas mitra untuk melaksanakan kerja praktik, magang klinis, maupun magang umum di RS Jiwa Tampan.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 text-left space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 flex items-center justify-center">
              <BookOpen size={24} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Pengajuan Izin Penelitian</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Fasilitas bagi peneliti, mahasiswa akhir, maupun praktisi akademisi untuk melakukan observasi medis, survei data, dan wawancara ilmiah.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-8 text-left space-y-4 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
              <FileText size={24} />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">Pelaporan & Data Publik</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Akses informasi ketersediaan tempat tidur pasca rehab, jadwal poliklinik psikologi, serta hasil IKM (Indeks Kepuasan Masyarakat).
            </p>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section id="visi" className="py-20 bg-slate-100 dark:bg-slate-900 border-y border-slate-200/50 dark:border-slate-850">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-teal-655 uppercase tracking-widest">Komitmen Kami</h3>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Visi Rumah Sakit</h2>
            <p className="text-lg text-teal-700 dark:text-teal-400 italic font-medium leading-relaxed">
              "Menjadi Rumah Sakit Jiwa Unggul, Kelas Dunia, dan Pilihan Utama Masyarakat Riau."
            </p>
            <div className="h-0.5 bg-gradient-to-r from-teal-500 to-transparent w-32"></div>
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-950 flex items-center justify-center text-teal-650 font-bold">1</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Pelayanan kesehatan jiwa komprehensif, bermutu dan efisien.</p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-950 flex items-center justify-center text-teal-650 font-bold">2</div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Menyelenggarakan pendidikan, pelatihan, dan penelitian bermutu tinggi.</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/40 dark:border-slate-800 p-8 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Misi Rumah Sakit</h3>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-555 mt-2 shrink-0"></span>
                <span>Meningkatkan profesionalisme SDM di bidang klinis maupun non-klinis secara berkelanjutan.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-555 mt-2 shrink-0"></span>
                <span>Meningkatkan sarana prasarana penunjang medis sesuai standar operasional yang tersertifikasi nasional.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-555 mt-2 shrink-0"></span>
                <span>Menjalin kemitraan akademik dengan berbagai lembaga pendidikan tinggi di tingkat regional maupun nasional.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Green Contact Banner */}
      <section className="bg-[#2ca56b] py-6 px-4 text-center">
        <h3 className="text-white font-extrabold text-lg md:text-2xl tracking-wide uppercase">
          KONTAK PENGADUAN : (0761) 63240 / 0822 6678 0044
        </h3>
      </section>

      {/* Location & Profile Footer */}
      <footer id="kontak" className="bg-[#1a2332] text-slate-300 py-16 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left: Google Maps Embed */}
          <div className="space-y-4">
            <div className="w-full h-72 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 relative bg-slate-800">
              <iframe
                title="Lokasi RS Jiwa Tampan"
                src="https://maps.google.com/maps?q=RS+Jiwa+Tampan+Pekanbaru&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Jl. HR. Soebrantas No. KM 12.5, Simpang Baru, Kec. Tampan, Kota Pekanbaru, Riau 28293
            </p>
          </div>

          {/* Right: Hospital Contact & Profile */}
          <div className="space-y-6 md:pl-8">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Profil RS Jiwa Tampan</h2>
              <p className="text-slate-400 text-sm mt-1">Rumah Sakit Jiwa Tampan</p>
            </div>

            <div className="space-y-4 pt-2">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#c5f1e7] shrink-0 mt-0.5">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</h4>
                  <p className="text-sm font-medium text-white hover:text-[#c5f1e7] transition-colors">
                    <a href="mailto:rsjtampan@riau.go.id">rsjtampan@riau.go.id</a>
                  </p>
                </div>
              </div>

              {/* Telepon */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#c5f1e7] shrink-0 mt-0.5">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Telepon</h4>
                  <p className="text-sm font-medium text-white">(0761) 63240</p>
                  <p className="text-sm font-medium text-white">082266780044</p>
                </div>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a 
                href="https://www.facebook.com/rsjiwatampanriau/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all"
                title="Facebook RSJ Tampan"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com/rsjiwatampan/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition-all"
                title="Instagram RSJ Tampan"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.youtube.com/channel/UCbVFneMnD59WgUFMKERQUAw" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all"
                title="YouTube RSJ Tampan"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

        </div>
        
        {/* Copyright */}
        <div className="max-w-6xl mx-auto border-t border-white/10 mt-12 pt-8 text-center text-xs text-slate-500">
          <p>© Design By SIMRS-2022</p>
        </div>
      </footer>

    </div>
  );
}
