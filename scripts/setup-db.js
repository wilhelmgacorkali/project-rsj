const fs = require("fs");
const path = require("path");
const postgres = require("postgres");

// Load DATABASE_URL from process.env or .env.local
let dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  try {
    const envPath = path.join(__dirname, "..", ".env.local");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf8");
      const match = envContent.match(/^DATABASE_URL\s*=\s*(.+)$/m);
      if (match) {
        dbUrl = match[1].trim().replace(/(^['"]|['"]$)/g, "");
      }
    }
  } catch (e) {
    console.error("Failed to read .env.local:", e);
  }
}

if (!dbUrl) {
  console.error("ERROR: DATABASE_URL is not set in environment or .env.local!");
  process.exit(1);
}

if (dbUrl.includes("[YOUR-PASSWORD]")) {
  console.error("ERROR: Please replace [YOUR-PASSWORD] with your actual Supabase database password in .env.local!");
  process.exit(1);
}

console.log("Connecting to Supabase PostgreSQL database...");
const sql = postgres(dbUrl, { ssl: "require" });

async function setup() {
  try {
    // 1. Create Users Table
    console.log("Creating table 'rsj_users' if it doesn't exist...");
    await sql`
      CREATE TABLE IF NOT EXISTS rsj_users (
        id SERIAL PRIMARY KEY,
        nama TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        institusi TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 2. Create Magang Table
    console.log("Creating table 'rsj_magang' if it doesn't exist...");
    await sql`
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 3. Create Penelitian Table
    console.log("Creating table 'rsj_penelitian' if it doesn't exist...");
    await sql`
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // 4. Seed Users Table
    const usersCountResult = await sql`SELECT COUNT(*)::int as count FROM rsj_users`;
    if (usersCountResult[0].count === 0) {
      console.log("Seeding default users...");
      await sql`
        INSERT INTO rsj_users (nama, email, password, institusi, role) VALUES
        ('Admin RSJ', 'admin@rsj.com', 'password', 'RS Jiwa Tampan', 'admin'),
        ('Budi Santoso', 'budi@gmail.com', 'password', 'Universitas Riau', 'magang')
      `;
    }

    // 5. Seed Magang Table
    const magangCountResult = await sql`SELECT COUNT(*)::int as count FROM rsj_magang`;
    if (magangCountResult[0].count === 0) {
      console.log("Seeding default internship (magang) entries...");
      await sql`
        INSERT INTO rsj_magang (id, nama, universitas, jurusan, periode_mulai, periode_selesai, unit_kerja, status) VALUES
        ('m-1', 'Ahmad Dani', 'Universitas Riau', 'Teknik Informatika', '2026-08-01', '2026-11-01', 'IT & PDE', 'Aktif'),
        ('m-2', 'Siti Rahmawati', 'Poltekkes Pekanbaru', 'Keperawatan Jiwa', '2026-07-15', '2026-09-15', 'Instalasi Rawat Inap', 'Aktif'),
        ('m-3', 'Rizky Pratama', 'UIN Suska Riau', 'Psikologi', '2026-09-01', '2026-12-01', 'Instalasi Rehabilitasi', 'Menunggu')
      `;
    }

    // 6. Seed Penelitian Table
    const penelitianCountResult = await sql`SELECT COUNT(*)::int as count FROM rsj_penelitian`;
    if (penelitianCountResult[0].count === 0) {
      console.log("Seeding default research (penelitian) entries...");
      await sql`
        INSERT INTO rsj_penelitian (id, nama, institusi, judul_penelitian, periode_mulai, periode_selesai, status) VALUES
        ('p-1', 'Dr. Farah Anindya', 'Universitas Abdurrab', 'Analisis Faktor Depresi Pasca Pandemi di Pekanbaru', '2026-08-10', '2026-10-10', 'Disetujui'),
        ('p-2', 'Budi Santoso', 'Universitas Muhammadiyah Riau', 'Implementasi Terapi Perilaku Kognitif Terhadap Pasien RSJ', '2026-08-20', '2026-11-20', 'Ditinjau')
      `;
    }

    console.log("Database tables created and seeded successfully!");
  } catch (err) {
    console.error("ERROR setting up database:", err);
  } finally {
    await sql.end();
  }
}

setup();
