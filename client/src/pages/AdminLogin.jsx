import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, let's use a hardcoded password. 
    // In a real app, we'd check this against the database.
    if (password === 'elysian2026') { 
      localStorage.setItem('isAdmin', 'true'); // Store login status
      navigate('/admin/dashboard');
    } else {
      alert('Access Denied: Incorrect Secret Code');
    }
  };

  return (
    <div style={{ padding: '100px 20px', textAlign: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '400px', margin: '0 auto', padding: '40px' }}>
        <h2 style={{ color: '#4A3728' }}>Admin Access</h2>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>Enter secret code to manage Inter.mezzo</p>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          <input 
            type="password" 
            placeholder="Secret Code" 
            style={inputStyle} 
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-elegant">Enter Dashboard</button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = { padding: '12px', borderRadius: '12px', border: '1px solid #DCAE96', outline: 'none' };

export default AdminLogin;