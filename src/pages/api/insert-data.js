import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { nama_siswa, nama_ortu, nomer_wa, ktp_ortu, akte_kelahiran, kartu_keluarga } = req.body;

  try {
    const newEntry = await sql`
      INSERT INTO ppdb_al_barokah (nama_siswa, nama_ortu, nomer_wa, ktp_ortu, akte_kelahiran, kartu_keluarga)
      VALUES (${nama_siswa}, ${nama_ortu}, ${nomer_wa}, ${ktp_ortu}, ${akte_kelahiran}, ${kartu_keluarga})
      RETURNING *;
    `;

    res.status(200).json({ message: 'Data berhasil ditambahkan', data: newEntry.rows[0] });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan data' });
  }
}
