import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RS Jiwa Tampan Provinsi Riau",
  description: "Portal resmi pendaftaran magang & penelitian di Rumah Sakit Jiwa Tampan Provinsi Riau.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} text-slate-800 dark:text-slate-100 bg-slate-50 dark:bg-slate-950 transition-colors duration-200`}>
        {children}
      </body>
    </html>
  );
}
