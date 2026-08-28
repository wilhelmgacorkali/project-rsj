"use server";

import db from "@/lib/db";
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
    const checkStmt = db.prepare("SELECT id FROM rsj_users WHERE LOWER(email) = LOWER(?)");
    const existing = checkStmt.get(userData.email);
    if (existing) {
      return { success: false, error: "Alamat email ini sudah terdaftar!" };
    }

    const insertStmt = db.prepare(`
      INSERT INTO rsj_users (nama, email, password, institusi, role)
      VALUES (?, ?, ?, ?, ?)
    `);

    const result = insertStmt.run(
      userData.nama,
      userData.email,
      userData.password,
      userData.institusi,
      userData.role
    );

    const newUser = db.prepare(`
      SELECT id, nama, email, institusi, role
      FROM rsj_users
      WHERE id = ?
    `).get(result.lastInsertRowid);

    return { success: true, user: newUser };
  } catch (error: any) {
    console.error("registerUserAction error:", error);

    if (error.message?.includes("UNIQUE constraint failed") || error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return { success: false, error: "Alamat email ini sudah terdaftar!" };
    }

    return { success: false, error: error.message || "Gagal melakukan registrasi." };
  }
}

export async function loginUserAction(email: string, password: string) {
  try {
    const stmt = db.prepare(`
      SELECT id, nama, email, password, institusi, role
      FROM rsj_users
      WHERE LOWER(email) = LOWER(?)
    `);
    const user = stmt.get(email) as any;

    if (!user) {
      return { success: false, error: "Email atau password salah!" };
    }

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
    return { success: false, error: error.message || "Gagal melakukan verifikasi login." };
  }
}

// ─── MAGANG (INTERNSHIP) ACTIONS ─────────────────────────────────────

export async function getMagangList() {
  try {
    const stmt = db.prepare(`
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
    `);
    const list = stmt.all();
    return { success: true, data: list as any[] };
  } catch (error: any) {
    console.error("getMagangList error:", error);
    return { success: false, error: error.message };
  }
}

export async function addMagang(data: Omit<MagangData, "id">) {
  const id = `m-${Date.now()}`;
  try {
    const stmt = db.prepare(`
      INSERT INTO rsj_magang (id, nama, universitas, jurusan, periode_mulai, periode_selesai, unit_kerja, status, file_name, file_data)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id,
      data.nama,
      data.universitas,
      data.jurusan,
      data.periodeMulai,
      data.periodeSelesai,
      data.unitKerja,
      data.status,
      data.fileName || null,
      data.fileData || null
    );
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
      const stmt = db.prepare(`
        UPDATE rsj_magang
        SET status = ?
        WHERE id = ?
      `);
      stmt.run(updatedData.status, id);
    } else {
      const stmt = db.prepare(`
        UPDATE rsj_magang
        SET 
          nama = COALESCE(?, nama),
          universitas = COALESCE(?, universitas),
          jurusan = COALESCE(?, jurusan),
          status = COALESCE(?, status)
        WHERE id = ?
      `);
      stmt.run(
        updatedData.nama || null,
        updatedData.universitas || null,
        updatedData.jurusan || null,
        updatedData.status || null,
        id
      );
    }
    return { success: true };
  } catch (error: any) {
    console.error("updateMagang error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteMagang(id: string) {
  try {
    const stmt = db.prepare(`
      DELETE FROM rsj_magang
      WHERE id = ?
    `);
    stmt.run(id);
    return { success: true };
  } catch (error: any) {
    console.error("deleteMagang error:", error);
    return { success: false, error: error.message };
  }
}

// ─── PENELITIAN (RESEARCH) ACTIONS ───────────────────────────────────

export async function getPenelitianList() {
  try {
    const stmt = db.prepare(`
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
    `);
    const list = stmt.all();
    return { success: true, data: list as any[] };
  } catch (error: any) {
    console.error("getPenelitianList error:", error);
    return { success: false, error: error.message };
  }
}

export async function addPenelitian(data: Omit<PenelitianData, "id">) {
  const id = `p-${Date.now()}`;
  try {
    const stmt = db.prepare(`
      INSERT INTO rsj_penelitian (id, nama, institusi, judul_penelitian, periode_mulai, periode_selesai, status, file_name, file_data)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id,
      data.nama,
      data.institusi,
      data.judulPenelitian,
      data.periodeMulai,
      data.periodeSelesai,
      data.status,
      data.fileName || null,
      data.fileData || null
    );
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
      const stmt = db.prepare(`
        UPDATE rsj_penelitian
        SET status = ?
        WHERE id = ?
      `);
      stmt.run(updatedData.status, id);
    } else {
      const stmt = db.prepare(`
        UPDATE rsj_penelitian
        SET 
          nama = COALESCE(?, nama),
          institusi = COALESCE(?, institusi),
          judul_penelitian = COALESCE(?, judul_penelitian),
          status = COALESCE(?, status)
        WHERE id = ?
      `);
      stmt.run(
        updatedData.nama || null,
        updatedData.institusi || null,
        updatedData.judulPenelitian || null,
        updatedData.status || null,
        id
      );
    }
    return { success: true };
  } catch (error: any) {
    console.error("updatePenelitian error:", error);
    return { success: false, error: error.message };
  }
}

export async function deletePenelitian(id: string) {
  try {
    const stmt = db.prepare(`
      DELETE FROM rsj_penelitian
      WHERE id = ?
    `);
    stmt.run(id);
    return { success: true };
  } catch (error: any) {
    console.error("deletePenelitian error:", error);
    return { success: false, error: error.message };
  }
}
