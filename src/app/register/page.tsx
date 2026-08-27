"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Lock, 
  Building, 
  GraduationCap, 
  ArrowRight,
  AlertCircle 
} from "lucide-react";

export default function RegisterPage() {
  const [role, setRole] = useState<"magang" | "peneliti">("magang");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institusi, setInstitusi] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !email || !password || !institusi) {
      setError("Harap isi semua kolom pendaftaran!");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate registration and save to localStorage
    setTimeout(() => {
      setIsLoading(false);
      
      const users = JSON.parse(localStorage.getItem("rsj_users") || "[]");
      // Prevent duplicates by email
      const filtered = users.filter((u: any) => u.email.toLowerCase() !== email.toLowerCase());
      filtered.push({ nama, email, password, institusi, role });
      localStorage.setItem("rsj_users", JSON.stringify(filtered));

      alert("Pendaftaran Akun Berhasil! Silakan masuk.");
      router.push("/login");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200 relative overflow-hidden">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 text-center space-y-4">
        {/* Brand */}
        <Link href="/" className="inline-flex items-center justify-center mb-2">
          <div className="flex items-center justify-center p-1 rounded-xl bg-white shadow-md shadow-teal-600/20 w-[130px] h-[70px] relative overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Logo RSJ Tampan" 
              className="object-contain w-full h-full"
            />
          </div>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Daftar Akun SIP Baru
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Registrasi sebagai Anak Magang atau Peneliti untuk mengajukan berkas.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-xl border border-slate-100 dark:border-slate-800/80 rounded-2xl sm:px-10 space-y-6">
          
          {/* Role selector tabs */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setRole("magang")}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                role === "magang"
                  ? "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-350"
              }`}
            >
              <GraduationCap size={16} />
              <span>Anak Magang</span>
            </button>
            <button
              onClick={() => setRole("peneliti")}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${
                role === "peneliti"
                  ? "bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-350"
              }`}
            >
              <Building size={16} />
              <span>Peneliti</span>
            </button>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl text-rose-700 dark:text-rose-455 text-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 text-slate-400" size={16} />
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-slate-400" size={16} />
                <input
                  type="email"
                  required
                  placeholder="name@institusi.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Asal {role === "magang" ? "Sekolah / Universitas" : "Lembaga / Institusi"}
              </label>
              <div className="relative">
                {role === "magang" ? (
                  <GraduationCap className="absolute left-3.5 top-3 text-slate-400" size={16} />
                ) : (
                  <Building className="absolute left-3.5 top-3 text-slate-400" size={16} />
                )}
                <input
                  type="text"
                  required
                  placeholder={role === "magang" ? "Universitas Riau" : "LIPI / BRIN"}
                  value={institusi}
                  onChange={(e) => setInstitusi(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Buat Kata Sandi
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-slate-400" size={16} />
                <input
                  type="password"
                  required
                  placeholder="Min. 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md shadow-teal-600/15 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Daftar Akun</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-5 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sudah punya akun?{" "}
              <Link href="/login" className="font-bold text-teal-600 hover:underline">
                Masuk Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
