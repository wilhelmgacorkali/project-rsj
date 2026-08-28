const db = require("better-sqlite3")("rsj.db");

console.log("=== 1. TEST QUERY USERS ===");
const users = db.prepare("SELECT * FROM rsj_users").all();
console.log(`Found ${users.length} users:`);
users.forEach(u => console.log(` - [${u.role}] ${u.nama} (${u.email})`));

console.log("\n=== 2. TEST LOGIN SIMULATION ===");
function testLogin(email, password) {
  const user = db.prepare("SELECT * FROM rsj_users WHERE LOWER(email) = LOWER(?)").get(email);
  if (!user) return { success: false, error: "User not found" };
  if (user.password !== password) return { success: false, error: "Wrong password" };
  return { success: true, user: { id: user.id, nama: user.nama, role: user.role } };
}

console.log("Admin Login:", testLogin("admin@rsj.com", "password"));
console.log("Magang Login:", testLogin("budi@gmail.com", "password"));

console.log("\n=== 3. TEST DATA MAGANG & PENELITIAN ===");
const magangCount = db.prepare("SELECT count(*) as count FROM rsj_magang").get();
const penelitianCount = db.prepare("SELECT count(*) as count FROM rsj_penelitian").get();
console.log(`Magang entries: ${magangCount.count}`);
console.log(`Penelitian entries: ${penelitianCount.count}`);
