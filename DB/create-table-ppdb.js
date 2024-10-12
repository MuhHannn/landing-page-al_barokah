require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {
  // Drop existing table if it exists
  const deleteTable = await sql`DROP TABLE IF EXISTS ppdb_al_barokah`;

  // Create the ppdb_al_barokah table with required fields
  const createTable = await sql`
    CREATE TABLE IF NOT EXISTS ppdb_al_barokah (
        id SERIAL PRIMARY KEY,
        nama_siswa VARCHAR(100) NOT NULL,
        nama_ortu VARCHAR(100) NOT NULL,
        nomer_wa VARCHAR(100) NOT NULL,
        ktp_ortu VARCHAR(50) NOT NULL,
        akte_kelahiran VARCHAR(50) NOT NULL,
        kartu_keluarga VARCHAR(50) NOT NULL
    );
  `;
  console.log(createTable);
}

execute();
