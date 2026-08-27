"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password harus diisi!");
      return;
    }

    if (!email.toLowerCase().includes("admin")) {
      setError("Akses ditolak! Halaman ini hanya untuk Administrator.");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate admin login success and redirect to admin dashboard
    setTimeout(() => {
      setIsLoading(false);
      const currentUser = { nama: "Administrator", email, institusi: "RS Jiwa Tampan", role: "admin" };
      localStorage.setItem("rsj_current_user", JSON.stringify(currentUser));
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden text-white">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 text-center space-y-4">
        {/* Brand */}
        <Link href="/" className="inline-flex items-center justify-center mb-2">
          <div className="flex items-center justify-center p-1 rounded-xl bg-white shadow-md shadow-indigo-600/20 w-[130px] h-[70px] relative overflow-hidden">
            <img 
              src="/logo.png" 
              alt="Logo RSJ Tampan" 
              className="object-contain w-full h-full"
            />
          </div>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
          <ShieldCheck className="text-indigo-400" size={24} />
          Portal Admin SIP
        </h2>
        <p className="text-sm text-slate-400">
          Gunakan akun administrator Anda untuk mengelola berkas magang & penelitian.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-slate-800 border border-slate-700/80 py-8 px-6 shadow-xl rounded-2xl sm:px-10">
          
          {error && (
            <div className="mb-5 p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Email Administrator
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-slate-400" size={16} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="admin@rsj.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Kata Sandi
                </label>
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md shadow-indigo-600/15 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Masuk Administrator</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-slate-700/80 pt-5 text-center">
            <p className="text-xs text-slate-400">
              Bukan admin?{" "}
              <Link href="/login" className="font-bold text-teal-400 hover:underline">
                Kembali ke Login User
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
