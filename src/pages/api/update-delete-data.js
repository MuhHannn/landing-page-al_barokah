// pages/api/ppdb/[id].js
import { sql } from "@vercel/postgres";

// Handle GET, PUT, DELETE requests for a specific record
export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const result = await sql`SELECT * FROM ppdb_al_barokah WHERE id = ${id}`;
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(result.rows[0]);
  } else if (req.method === 'PUT') {
    const { nama_siswa, nama_ortu, ktp_ortu, akte_kelahiran, kartu_keluarga, bukti_pembayaran } = req.body;
    const result = await sql`
      UPDATE ppdb_al_barokah
      SET 
        nama_siswa = ${nama_siswa}, 
        nama_ortu = ${nama_ortu}, 
        ktp_ortu = ${ktp_ortu}, 
        akte_kelahiran = ${akte_kelahiran}, 
        kartu_keluarga = ${kartu_keluarga}, 
        bukti_pembayaran = ${bukti_pembayaran}
      WHERE id = ${id}
      RETURNING *
    `;
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(result.rows[0]);
  } else if (req.method === 'DELETE') {
    const result = await sql`DELETE FROM ppdb_al_barokah WHERE id = ${id} RETURNING *`;
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
