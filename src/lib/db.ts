import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Initialize local SQLite database instance
const dbPath = path.join(process.cwd(), "rsj.db");
const db = new Database(dbPath);

// Enable WAL (Write-Ahead Logging) for optimal performance and concurrency
db.pragma("journal_mode = WAL");

// Initialize tables if they do not exist
function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS rsj_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL COLLATE NOCASE,
      password TEXT NOT NULL,
      institusi TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS rsj_magang (
      id TEXT PRIMARY KEY,
      nama TEXT NOT NULL,
      universitas TEXT NOT NULL,
      jurusan TEXT NOT NULL,
      periode_mulai TEXT NOT NULL,
      periode_selesai TEXT NOT NULL,
      unit_kerja TEXT NOT NULL,
      status TEXT NOT NULL,
      file_name TEXT,
      file_data TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS rsj_penelitian (
      id TEXT PRIMARY KEY,
      nama TEXT NOT NULL,
      institusi TEXT NOT NULL,
      judul_penelitian TEXT NOT NULL,
      periode_mulai TEXT NOT NULL,
      periode_selesai TEXT NOT NULL,
      status TEXT NOT NULL,
      file_name TEXT,
      file_data TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default users if empty
  const userCount = db.prepare("SELECT COUNT(*) as count FROM rsj_users").get() as { count: number };
  if (userCount.count === 0) {
    const insertUser = db.prepare(`
      INSERT INTO rsj_users (nama, email, password, institusi, role)
      VALUES (?, ?, ?, ?, ?)
    `);
    insertUser.run("Admin RSJ", "admin@rsj.com", "password", "RS Jiwa Tampan", "admin");
    insertUser.run("Budi Santoso", "budi@gmail.com", "password", "Universitas Riau", "magang");
  }

  // Seed default magang entries if empty
  const magangCount = db.prepare("SELECT COUNT(*) as count FROM rsj_magang").get() as { count: number };
  if (magangCount.count === 0) {
    const insertMagang = db.prepare(`
      INSERT INTO rsj_magang (id, nama, universitas, jurusan, periode_mulai, periode_selesai, unit_kerja, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertMagang.run("m-1", "Ahmad Dani", "Universitas Riau", "Teknik Informatika", "2026-08-01", "2026-11-01", "IT & PDE", "Aktif");
    insertMagang.run("m-2", "Siti Rahmawati", "Poltekkes Pekanbaru", "Keperawatan Jiwa", "2026-07-15", "2026-09-15", "Instalasi Rawat Inap", "Aktif");
    insertMagang.run("m-3", "Rizky Pratama", "UIN Suska Riau", "Psikologi", "2026-09-01", "2026-12-01", "Instalasi Rehabilitasi", "Menunggu");
  }

  // Seed default penelitian entries if empty
  const penelitianCount = db.prepare("SELECT COUNT(*) as count FROM rsj_penelitian").get() as { count: number };
  if (penelitianCount.count === 0) {
    const insertPenelitian = db.prepare(`
      INSERT INTO rsj_penelitian (id, nama, institusi, judul_penelitian, periode_mulai, periode_selesai, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    insertPenelitian.run("p-1", "Dr. Farah Anindya", "Universitas Abdurrab", "Analisis Faktor Depresi Pasca Pandemi di Pekanbaru", "2026-08-10", "2026-10-10", "Disetujui");
    insertPenelitian.run("p-2", "Budi Santoso", "Universitas Muhammadiyah Riau", "Implementasi Terapi Perilaku Kognitif Terhadap Pasien RSJ", "2026-08-20", "2026-11-20", "Ditinjau");
  }
}

// Run DB initialization once
initDb();

export default db;
