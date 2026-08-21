"use client";

import { useState, useEffect } from "react";

export interface MagangData {
  id: string;
  nama: string;
  universitas: string;
  jurusan: string;
  periodeMulai: string;
  periodeSelesai: string;
  unitKerja: string;
  status: "Aktif" | "Selesai" | "Menunggu";
}

export interface PenelitianData {
  id: string;
  nama: string;
  institusi: string;
  judulPenelitian: string;
  periodeMulai: string;
  periodeSelesai: string;
  status: "Disetujui" | "Ditinjau" | "Ditolak";
}

const DEFAULT_MAGANG: MagangData[] = [
  {
    id: "m-1",
    nama: "Ahmad Dani",
    universitas: "Universitas Riau",
    jurusan: "Teknik Informatika",
    periodeMulai: "2026-08-01",
    periodeSelesai: "2026-11-01",
    unitKerja: "IT & PDE",
    status: "Aktif",
  },
  {
    id: "m-2",
    nama: "Siti Rahmawati",
    universitas: "Poltekkes Pekanbaru",
    jurusan: "Keperawatan Jiwa",
    periodeMulai: "2026-07-15",
    periodeSelesai: "2026-09-15",
    unitKerja: "Instalasi Rawat Inap",
    status: "Aktif",
  },
  {
    id: "m-3",
    nama: "Rizky Pratama",
    universitas: "UIN Suska Riau",
    jurusan: "Psikologi",
    periodeMulai: "2026-09-01",
    periodeSelesai: "2026-12-01",
    unitKerja: "Instalasi Rehabilitasi",
    status: "Menunggu",
  }
];

const DEFAULT_PENELITIAN: PenelitianData[] = [
  {
    id: "p-1",
    nama: "Dr. Farah Anindya",
    institusi: "Universitas Abdurrab",
    judulPenelitian: "Analisis Faktor Depresi Pasca Pandemi di Pekanbaru",
    periodeMulai: "2026-08-10",
    periodeSelesai: "2026-10-10",
    status: "Disetujui",
  },
  {
    id: "p-2",
    nama: "Budi Santoso",
    institusi: "Universitas Muhammadiyah Riau",
    judulPenelitian: "Implementasi Terapi Perilaku Kognitif Terhadap Pasien RSJ",
    periodeMulai: "2026-08-20",
    periodeSelesai: "2026-11-20",
    status: "Ditinjau",
  }
];

export function usePersistentData() {
  const [magangList, setMagangList] = useState<MagangData[]>([]);
  const [penelitianList, setPenelitianList] = useState<PenelitianData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedMagang = localStorage.getItem("rsj_magang");
    const storedPenelitian = localStorage.getItem("rsj_penelitian");

    if (storedMagang) {
      setMagangList(JSON.parse(storedMagang));
    } else {
      setMagangList(DEFAULT_MAGANG);
      localStorage.setItem("rsj_magang", JSON.stringify(DEFAULT_MAGANG));
    }

    if (storedPenelitian) {
      setPenelitianList(JSON.parse(storedPenelitian));
    } else {
      setPenelitianList(DEFAULT_PENELITIAN);
      localStorage.setItem("rsj_penelitian", JSON.stringify(DEFAULT_PENELITIAN));
    }
    
    setIsLoaded(true);
  }, []);

  const saveMagang = (newList: MagangData[]) => {
    setMagangList(newList);
    localStorage.setItem("rsj_magang", JSON.stringify(newList));
  };

  const savePenelitian = (newList: PenelitianData[]) => {
    setPenelitianList(newList);
    localStorage.setItem("rsj_penelitian", JSON.stringify(newList));
  };

  const addMagang = (data: Omit<MagangData, "id">) => {
    const newItem: MagangData = {
      ...data,
      id: `m-${Date.now()}`,
    };
    saveMagang([newItem, ...magangList]);
  };

  const updateMagang = (id: string, updatedData: Partial<Omit<MagangData, "id">>) => {
    const updated = magangList.map(item => item.id === id ? { ...item, ...updatedData } : item);
    saveMagang(updated);
  };

  const deleteMagang = (id: string) => {
    saveMagang(magangList.filter(item => item.id !== id));
  };

  const addPenelitian = (data: Omit<PenelitianData, "id">) => {
    const newItem: PenelitianData = {
      ...data,
      id: `p-${Date.now()}`,
    };
    savePenelitian([newItem, ...penelitianList]);
  };

  const updatePenelitian = (id: string, updatedData: Partial<Omit<PenelitianData, "id">>) => {
    const updated = penelitianList.map(item => item.id === id ? { ...item, ...updatedData } : item);
    savePenelitian(updated);
  };

  const deletePenelitian = (id: string) => {
    savePenelitian(penelitianList.filter(item => item.id !== id));
  };

  return {
    magangList,
    penelitianList,
    addMagang,
    updateMagang,
    deleteMagang,
    addPenelitian,
    updatePenelitian,
    deletePenelitian,
    isLoaded
  };
}
