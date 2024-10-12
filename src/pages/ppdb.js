import { useEffect, useState } from 'react';
import { sql } from '@vercel/postgres';

const PpdbPage = () => {
  const [ppdbData, setPpdbData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-data');
        const data = await response.json();
        setPpdbData(data);
      } catch (error) {
        console.error('Error fetching PPDB data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Data PPDB</h1>
      <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nama Anak</th>
            <th className="border border-gray-300 px-4 py-2">Nama Orang Tua</th>
            <th className="border border-gray-300 px-4 py-2">Nomer Whatasapp</th>
            <th className="border border-gray-300 px-4 py-2">KTP Orang Tua</th>
            <th className="border border-gray-300 px-4 py-2">Akte Kelahiran</th>
            <th className="border border-gray-300 px-4 py-2">Kartu Keluarga</th>
          </tr>
        </thead>
        <tbody>
          {ppdbData.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-100 transition-colors duration-200">
              <td className="border border-gray-300 px-4 py-2 text-center">{entry.nama_siswa}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{entry.nama_ortu}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{entry.nomer_wa}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{entry.ktp_ortu}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{entry.akte_kelahiran}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">{entry.kartu_keluarga}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PpdbPage;
