"use server";

import sql from "@/lib/db";
import { MagangData, PenelitianData } from "@/hooks/usePersistentData";

// ─── AUTHENTICATION ACTIONS ──────────────────────────────────────────

export async function registerUserAction(userData: {
  nama: string;
  email: string;
  password: string;
  institusi: string;
  role: string;
}) {
  try {
    const result = await sql`
      INSERT INTO rsj_users (nama, email, password, institusi, role)
      VALUES (${userData.nama}, ${userData.email}, ${userData.password}, ${userData.institusi}, ${userData.role})
      RETURNING id, nama, email, institusi, role
    `;
    return { success: true, user: result[0] };
  } catch (error: any) {
    console.error("registerUserAction error:", error);
    // Custom error message for duplicate email
    if (error.message?.includes("unique constraint") || error.code === "23505") {
      return { success: false, error: "Alamat email ini sudah terdaftar!" };
    }
    return { success: false, error: error.message || "Gagal melakukan registrasi." };
  }
}

export async function loginUserAction(email: string, password: string) {
  try {
    const result = await sql`
      SELECT id, nama, email, password, institusi, role
      FROM rsj_users
      WHERE LOWER(email) = LOWER(${email})
    `;
    if (result.length === 0) {
      return { success: false, error: "Email atau password salah!" };
    }
    const user = result[0];
    if (user.password !== password) {
      return { success: false, error: "Email atau password salah!" };
    }
    return { 
      success: true, 
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        institusi: user.institusi,
        role: user.role
      } 
    };
  } catch (error: any) {
    console.error("loginUserAction error:", error);
    return { success: false, error: error.message || "Gagal melakukan verifikasi." };
  }
}

// ─── MAGANG (INTERNSHIP) ACTIONS ─────────────────────────────────────

export async function getMagangList() {
  try {
    const list = await sql`
      SELECT 
        id, 
        nama, 
        universitas, 
        jurusan, 
        periode_mulai as "periodeMulai", 
        periode_selesai as "periodeSelesai", 
        unit_kerja as "unitKerja", 
        status, 
        file_name as "fileName", 
        file_data as "fileData"
      FROM rsj_magang
      ORDER BY created_at DESC
    `;
    return { success: true, data: list as any[] };
  } catch (error: any) {
    console.error("getMagangList error:", error);
    return { success: false, error: error.message };
  }
}

export async function addMagang(data: Omit<MagangData, "id">) {
  const id = `m-${Date.now()}`;
  try {
    await sql`
      INSERT INTO rsj_magang (id, nama, universitas, jurusan, periode_mulai, periode_selesai, unit_kerja, status, file_name, file_data)
      VALUES (${id}, ${data.nama}, ${data.universitas}, ${data.jurusan}, ${data.periodeMulai}, ${data.periodeSelesai}, ${data.unitKerja}, ${data.status}, ${data.fileName || null}, ${data.fileData || null})
    `;
    return { success: true, id };
  } catch (error: any) {
    console.error("addMagang error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateMagang(id: string, updatedData: Partial<Omit<MagangData, "id">>) {
  try {
    if (Object.keys(updatedData).length === 0) return { success: true };
    
    if (updatedData.status && Object.keys(updatedData).length === 1) {
      await sql`
        UPDATE rsj_magang
        SET status = ${updatedData.status}
        WHERE id = ${id}
      `;
    } else {
      await sql`
        UPDATE rsj_magang
        SET 
          nama = COALESCE(${updatedData.nama || null}, nama),
          universitas = COALESCE(${updatedData.universitas || null}, universitas),
          jurusan = COALESCE(${updatedData.jurusan || null}, jurusan),
          status = COALESCE(${updatedData.status || null}, status)
        WHERE id = ${id}
      `;
    }
    return { success: true };
  } catch (error: any) {
    console.error("updateMagang error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteMagang(id: string) {
  try {
    await sql`
      DELETE FROM rsj_magang
      WHERE id = ${id}
    `;
    return { success: true };
  } catch (error: any) {
    console.error("deleteMagang error:", error);
    return { success: false, error: error.message };
  }
}

// ─── PENELITIAN (RESEARCH) ACTIONS ───────────────────────────────────

export async function getPenelitianList() {
  try {
    const list = await sql`
      SELECT 
        id, 
        nama, 
        institusi, 
        judul_penelitian as "judulPenelitian", 
        periode_mulai as "periodeMulai", 
        periode_selesai as "periodeSelesai", 
        status, 
        file_name as "fileName", 
        file_data as "fileData"
      FROM rsj_penelitian
      ORDER BY created_at DESC
    `;
    return { success: true, data: list as any[] };
  } catch (error: any) {
    console.error("getPenelitianList error:", error);
    return { success: false, error: error.message };
  }
}

export async function addPenelitian(data: Omit<PenelitianData, "id">) {
  const id = `p-${Date.now()}`;
  try {
    await sql`
      INSERT INTO rsj_penelitian (id, nama, institusi, judul_penelitian, periode_mulai, periode_selesai, status, file_name, file_data)
      VALUES (${id}, ${data.nama}, ${data.institusi}, ${data.judulPenelitian}, ${data.periodeMulai}, ${data.periodeSelesai}, ${data.status}, ${data.fileName || null}, ${data.fileData || null})
    `;
    return { success: true, id };
  } catch (error: any) {
    console.error("addPenelitian error:", error);
    return { success: false, error: error.message };
  }
}

export async function updatePenelitian(id: string, updatedData: Partial<Omit<PenelitianData, "id">>) {
  try {
    if (Object.keys(updatedData).length === 0) return { success: true };
    
    if (updatedData.status && Object.keys(updatedData).length === 1) {
      await sql`
        UPDATE rsj_penelitian
        SET status = ${updatedData.status}
        WHERE id = ${id}
      `;
    } else {
      await sql`
        UPDATE rsj_penelitian
        SET 
          nama = COALESCE(${updatedData.nama || null}, nama),
          institusi = COALESCE(${updatedData.institusi || null}, institusi),
          judul_penelitian = COALESCE(${updatedData.judulPenelitian || null}, judul_penelitian),
          status = COALESCE(${updatedData.status || null}, status)
        WHERE id = ${id}
      `;
    }
    return { success: true };
  } catch (error: any) {
    console.error("updatePenelitian error:", error);
    return { success: false, error: error.message };
  }
}

export async function deletePenelitian(id: string) {
  try {
    await sql`
      DELETE FROM rsj_penelitian
      WHERE id = ${id}
    `;
    return { success: true };
  } catch (error: any) {
    console.error("deletePenelitian error:", error);
    return { success: false, error: error.message };
  }
}
