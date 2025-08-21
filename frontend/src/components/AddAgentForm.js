import React, { useState } from 'react';
import axios from 'axios';

export default function AddAgentForm() {
  const [data, setData] = useState({ name:'', email:'', mobile:'', password:'' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setData({...data, [e.target.name]:e.target.value });
  
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/agent/add', data, { headers: { Authorization: 'Bearer ' + token } });
      setMsg('✅ Agent added successfully');
    } catch (err) {
      setMsg('❌ ' + (err.response?.data?.msg || 'Error'));
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <h4 className="text-xl font-bold text-gray-700">➕ Add New Agent</h4>

      <input 
        name="name" 
        placeholder="Agent Name" 
        required 
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
      />
      <input 
        name="email" 
        type="email" 
        placeholder="Email Address" 
        required 
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
      />
      <input 
        name="mobile" 
        placeholder="Mobile (+91...)" 
        required 
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
      />
      <input 
        name="password" 
        type="password" 
        placeholder="Password" 
        required 
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
      />

      <button 
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Agent
      </button>

      {msg && <div className="text-sm mt-2 text-center">{msg}</div>}
    </form>
  );
}

