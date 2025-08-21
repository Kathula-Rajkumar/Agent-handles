import React, { useState } from 'react';
import axios from 'axios';

export default function UploadListForm() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleChange = e => setFile(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) return setMsg('⚠️ Please select a file first');

    const data = new FormData();
    data.append('file', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/list/upload', data, { 
        headers: { Authorization: 'Bearer ' + token } 
      });
      setMsg('✅ File uploaded and distributed!');
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.msg || 'Error'));
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 mt-6"
    >
      <h4 className="text-xl font-bold text-gray-700">📤 Upload CSV/XLSX</h4>

      <input 
        type="file" 
        accept=".csv,.xlsx,.xls" 
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
      />

      <button 
        type="submit" 
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
      >
        Upload File
      </button>

      {msg && <div className="text-sm mt-2 text-center">{msg}</div>}
    </form>
  );
}
