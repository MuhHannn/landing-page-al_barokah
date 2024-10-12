// pages/api/ppdb/index.js
import { sql } from "@vercel/postgres";

// Handle GET and POST requests
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const result = await sql`SELECT * FROM ppdb_al_barokah`;
    res.status(200).json(result.rows);
  } else if (req.method === 'POST') {
    const { nama_siswa, nama_ortu, ktp_ortu, akte_kelahiran, kartu_keluarga, bukti_pembayaran } = req.body;
    const result = await sql`
      INSERT INTO ppdb_al_barokah (nama_siswa, nama_ortu, ktp_ortu, akte_kelahiran, kartu_keluarga, bukti_pembayaran)
      VALUES (${nama_siswa}, ${nama_ortu}, ${ktp_ortu}, ${akte_kelahiran}, ${kartu_keluarga}, ${bukti_pembayaran})
      RETURNING *
    `;
    res.status(201).json(result.rows[0]);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
