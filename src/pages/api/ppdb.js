// pages/api/ppdb.js
import { sql } from "@vercel/postgres"; // Import the SQL client

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { namaSiswa, namaOrtu, ktpOrtu, akteKelahiran, kartuKeluarga, buktiPembayaran } = req.body;

    // Handle file upload if needed (for example, save it to a specific folder or cloud storage)

    try {
      // Insert into the database
      const result = await sql`
        INSERT INTO ppdb_al_barokah (nama_siswa, nama_ortu, ktp_ortu, akte_kelahiran, kartu_keluarga, bukti_pembayaran)
        VALUES (${namaSiswa}, ${namaOrtu}, ${ktpOrtu}, ${akteKelahiran}, ${kartuKeluarga}, ${buktiPembayaran})
      `;
      res.status(201).json({ message: "Data submitted successfully", result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error submitting data" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
