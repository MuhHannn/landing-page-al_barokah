require("dotenv").config({ path: ".env.development.local" });

const { sql } = require("@vercel/postgres");

async function execute() {

  // Create the ppdb_al_barokah table with required fields
  const result = await sql`
    SELECT * FROM ppdb_al_barokah
  `;
  console.log(result.rows);
}

execute();
