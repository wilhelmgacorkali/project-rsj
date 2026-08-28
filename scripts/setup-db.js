const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "..", "rsj.db");
console.log(`Connecting to SQLite database at: ${dbPath}`);

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

function setup() {
  try {
    // 1. Create Users Table
    console.log("Creating table 'rsj_users' if it doesn't exist...");
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
    `);

    // 2. Create Magang Table
    console.log("Creating table 'rsj_magang' if it doesn't exist...");
    db.exec(`
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
    `);

    // 3. Create Penelitian Table
    console.log("Creating table 'rsj_penelitian' if it doesn't exist...");
    db.exec(`
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

    // 4. Seed Users Table
    const userCount = db.prepare("SELECT COUNT(*) as count FROM rsj_users").get();
    if (userCount.count === 0) {
      console.log("Seeding default users...");
      const insertUser = db.prepare(`
        INSERT INTO rsj_users (nama, email, password, institusi, role)
        VALUES (?, ?, ?, ?, ?)
      `);
      insertUser.run("Admin RSJ", "admin@rsj.com", "password", "RS Jiwa Tampan", "admin");
      insertUser.run("Budi Santoso", "budi@gmail.com", "password", "Universitas Riau", "magang");
    }

    // 5. Seed Magang Table
    const magangCount = db.prepare("SELECT COUNT(*) as count FROM rsj_magang").get();
    if (magangCount.count === 0) {
      console.log("Seeding default internship (magang) entries...");
      const insertMagang = db.prepare(`
        INSERT INTO rsj_magang (id, nama, universitas, jurusan, periode_mulai, periode_selesai, unit_kerja, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      insertMagang.run("m-1", "Ahmad Dani", "Universitas Riau", "Teknik Informatika", "2026-08-01", "2026-11-01", "IT & PDE", "Aktif");
      insertMagang.run("m-2", "Siti Rahmawati", "Poltekkes Pekanbaru", "Keperawatan Jiwa", "2026-07-15", "2026-09-15", "Instalasi Rawat Inap", "Aktif");
      insertMagang.run("m-3", "Rizky Pratama", "UIN Suska Riau", "Psikologi", "2026-09-01", "2026-12-01", "Instalasi Rehabilitasi", "Menunggu");
    }

    // 6. Seed Penelitian Table
    const penelitianCount = db.prepare("SELECT COUNT(*) as count FROM rsj_penelitian").get();
    if (penelitianCount.count === 0) {
      console.log("Seeding default research (penelitian) entries...");
      const insertPenelitian = db.prepare(`
        INSERT INTO rsj_penelitian (id, nama, institusi, judul_penelitian, periode_mulai, periode_selesai, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      insertPenelitian.run("p-1", "Dr. Farah Anindya", "Universitas Abdurrab", "Analisis Faktor Depresi Pasca Pandemi di Pekanbaru", "2026-08-10", "2026-10-10", "Disetujui");
      insertPenelitian.run("p-2", "Budi Santoso", "Universitas Muhammadiyah Riau", "Implementasi Terapi Perilaku Kognitif Terhadap Pasien RSJ", "2026-08-20", "2026-11-20", "Ditinjau");
    }

    console.log("SQLite Database tables created and seeded successfully!");
  } catch (err) {
    console.error("ERROR setting up SQLite database:", err);
  } finally {
    db.close();
  }
}

setup();
