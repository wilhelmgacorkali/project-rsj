"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { loginUserAction } from "@/app/actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password harus diisi!");
      return;
    }

    if (email.toLowerCase().includes("admin")) {
      setError("Email admin terdeteksi. Silakan masuk melalui Halaman Login Admin khusus.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await loginUserAction(email, password);
      setIsLoading(false);
      if (res.success && res.user) {
        localStorage.setItem("rsj_current_user", JSON.stringify(res.user));
        router.push("/portal");
      } else {
        setError(res.error || "Email atau password salah!");
      }
    } catch (err: any) {
      setIsLoading(false);
      setError("Terjadi kesalahan jaringan atau server.");
    }
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
          Masuk ke Portal SIP
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Masukkan akun Anda untuk mengelola magang & penelitian.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-xl border border-slate-100 dark:border-slate-800/80 rounded-2xl sm:px-10">
          
          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-xl text-rose-700 dark:text-rose-450 text-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-slate-400" size={16} />
                <input
                  id="email"
                  name="email"
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
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-550 dark:text-slate-400 uppercase tracking-wider">
                  Kata Sandi
                </label>
                <Link href="#" className="text-xs font-semibold text-teal-600 hover:underline">
                  Lupa sandi?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 text-slate-400" size={16} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-550 dark:text-slate-400 font-medium">
                  Ingat perangkat ini
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md shadow-teal-600/15 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Masuk Aplikasi</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-5 text-center space-y-3">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Belum terdaftar?{" "}
              <Link href="/register" className="font-bold text-teal-650 hover:underline">
                Buat Akun Baru
              </Link>
            </p>
            <p className="text-xs text-slate-400">
              Masuk sebagai petugas?{" "}
              <Link href="/admin-login" className="font-bold text-indigo-600 hover:underline">
                Halaman Login Admin
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
