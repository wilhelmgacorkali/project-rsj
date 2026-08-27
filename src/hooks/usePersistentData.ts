"use client";

import { useState, useEffect } from "react";
import { 
  getMagangList as fetchMagangList,
  addMagang as createMagang,
  updateMagang as editMagang,
  deleteMagang as removeMagang,
  getPenelitianList as fetchPenelitianList,
  addPenelitian as createPenelitian,
  updatePenelitian as editPenelitian,
  deletePenelitian as removePenelitian
} from "@/app/actions";

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

export function usePersistentData() {
  const [magangList, setMagangList] = useState<MagangData[]>([]);
  const [penelitianList, setPenelitianList] = useState<PenelitianData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadAll() {
      const magangRes = await fetchMagangList();
      const penelitianRes = await fetchPenelitianList();

      if (magangRes.success && magangRes.data) {
        setMagangList(magangRes.data);
      }
      if (penelitianRes.success && penelitianRes.data) {
        setPenelitianList(penelitianRes.data);
      }
      setIsLoaded(true);
    }
    loadAll();
  }, []);

  const addMagang = async (data: Omit<MagangData, "id">) => {
    const res = await createMagang(data);
    if (res.success && res.id) {
      setMagangList(prev => [{ ...data, id: res.id }, ...prev]);
    } else {
      console.error("Gagal menambah data magang:", res.error);
    }
  };

  const updateMagang = async (id: string, updatedData: Partial<Omit<MagangData, "id">>) => {
    const res = await editMagang(id, updatedData);
    if (res.success) {
      setMagangList(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
    } else {
      console.error("Gagal memperbarui data magang:", res.error);
    }
  };

  const deleteMagang = async (id: string) => {
    const res = await removeMagang(id);
    if (res.success) {
      setMagangList(prev => prev.filter(item => item.id !== id));
    } else {
      console.error("Gagal menghapus data magang:", res.error);
    }
  };

  const addPenelitian = async (data: Omit<PenelitianData, "id">) => {
    const res = await createPenelitian(data);
    if (res.success && res.id) {
      setPenelitianList(prev => [{ ...data, id: res.id }, ...prev]);
    } else {
      console.error("Gagal menambah data penelitian:", res.error);
    }
  };

  const updatePenelitian = async (id: string, updatedData: Partial<Omit<PenelitianData, "id">>) => {
    const res = await editPenelitian(id, updatedData);
    if (res.success) {
      setPenelitianList(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
    } else {
      console.error("Gagal memperbarui data penelitian:", res.error);
    }
  };

  const deletePenelitian = async (id: string) => {
    const res = await removePenelitian(id);
    if (res.success) {
      setPenelitianList(prev => prev.filter(item => item.id !== id));
    } else {
      console.error("Gagal menghapus data penelitian:", res.error);
    }
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
