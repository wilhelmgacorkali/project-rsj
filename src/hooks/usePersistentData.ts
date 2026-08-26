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
  status: "Aktif" | "Selesai" | "Menunggu" | "Ditolak";
  fileName?: string;
  fileData?: string;
}

export interface PenelitianData {
  id: string;
  nama: string;
  institusi: string;
  judulPenelitian: string;
  periodeMulai: string;
  periodeSelesai: string;
  status: "Disetujui" | "Ditinjau" | "Ditolak";
  fileName?: string;
  fileData?: string;
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

// ── IndexedDB helpers for large file blobs ──────────────────────────
const DB_NAME = "rsj_files_db";
const DB_VERSION = 1;
const STORE_NAME = "files";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbSaveFile(key: string, data: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(data, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function idbGetFile(key: string): Promise<string | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => resolve(req.result as string | undefined);
    req.onerror = () => reject(req.error);
  });
}

async function idbDeleteFile(key: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// Strip fileData before saving to localStorage (to avoid QuotaExceededError)
function stripFileData<T extends { fileData?: string }>(list: T[]): T[] {
  return list.map(({ fileData, ...rest }) => rest as T);
}

// ── Main hook ───────────────────────────────────────────────────────
export function usePersistentData() {
  const [magangList, setMagangList] = useState<MagangData[]>([]);
  const [penelitianList, setPenelitianList] = useState<PenelitianData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load metadata from localStorage, then hydrate fileData from IndexedDB
  useEffect(() => {
    async function loadAll() {
      // 1. Load metadata from localStorage
      const storedMagang = localStorage.getItem("rsj_magang");
      const storedPenelitian = localStorage.getItem("rsj_penelitian");

      let magang: MagangData[] = storedMagang
        ? JSON.parse(storedMagang)
        : DEFAULT_MAGANG;

      let penelitian: PenelitianData[] = storedPenelitian
        ? JSON.parse(storedPenelitian)
        : DEFAULT_PENELITIAN;

      if (!storedMagang) {
        localStorage.setItem("rsj_magang", JSON.stringify(stripFileData(DEFAULT_MAGANG)));
      }
      if (!storedPenelitian) {
        localStorage.setItem("rsj_penelitian", JSON.stringify(stripFileData(DEFAULT_PENELITIAN)));
      }

      // 2. Hydrate fileData from IndexedDB
      try {
        for (const item of magang) {
          if (item.fileName) {
            const data = await idbGetFile(`file_${item.id}`);
            if (data) item.fileData = data;
          }
        }
        for (const item of penelitian) {
          if (item.fileName) {
            const data = await idbGetFile(`file_${item.id}`);
            if (data) item.fileData = data;
          }
        }
      } catch {
        // IndexedDB not available – files won't persist across reloads
      }

      setMagangList(magang);
      setPenelitianList(penelitian);
      setIsLoaded(true);
    }

    loadAll();
  }, []);

  // Save metadata to localStorage (no fileData) + file blobs to IndexedDB
  const saveMagang = async (newList: MagangData[]) => {
    setMagangList(newList);
    localStorage.setItem("rsj_magang", JSON.stringify(stripFileData(newList)));

    // Persist any new file blobs
    for (const item of newList) {
      if (item.fileData) {
        try { await idbSaveFile(`file_${item.id}`, item.fileData); } catch {}
      }
    }
  };

  const savePenelitian = async (newList: PenelitianData[]) => {
    setPenelitianList(newList);
    localStorage.setItem("rsj_penelitian", JSON.stringify(stripFileData(newList)));

    for (const item of newList) {
      if (item.fileData) {
        try { await idbSaveFile(`file_${item.id}`, item.fileData); } catch {}
      }
    }
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

  const deleteMagang = async (id: string) => {
    saveMagang(magangList.filter(item => item.id !== id));
    try { await idbDeleteFile(`file_${id}`); } catch {}
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

  const deletePenelitian = async (id: string) => {
    savePenelitian(penelitianList.filter(item => item.id !== id));
    try { await idbDeleteFile(`file_${id}`); } catch {}
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
