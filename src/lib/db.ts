import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables!");
}

// Initialize the database connection.
// Supabase requires SSL to connect securely from external hosts.
const sql = postgres(connectionString, { 
  ssl: "require",
  // Prevent connections from hanging in development
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

export default sql;
