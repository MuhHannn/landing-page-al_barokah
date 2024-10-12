import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const data = await sql`SELECT * FROM ppdb_al_barokah;`;
    res.status(200).json(data.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data' });
  }
}
