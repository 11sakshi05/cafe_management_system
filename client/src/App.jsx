import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';

// Import your pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import Feedback from './pages/Feedback';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
// Add this line with your other imports
import FindUs from './pages/FindUs';

// 1. The Layout (Keep this as you have it)
const Layout = () => (
  <div style={{ backgroundColor: '#FFF8F5', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
    <nav style={{ 
      background: '#4A3728', 
      padding: '1.2rem', 
      display: 'flex', 
      justifyContent: 'center', 
      gap: '40px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <Link to="/" style={linkStyle}>HOME</Link>
      <Link to="/menu" style={linkStyle}>MENU</Link>
      <Link to="/reservation" style={linkStyle}>RESERVATION</Link>
      <Link to="/feedback" style={linkStyle}>FEEDBACK</Link>
      <Link to="/find-us" style={linkStyle}>FIND US</Link>
    </nav>
    <Outlet /> 
  </div>
);

const linkStyle = { color: '#DCAE96', textDecoration: 'none', fontWeight: 'bold', letterSpacing: '1px' };

function App() {
  return (
    <Router>
      <Routes>
        {/* --- WRAP MAIN PAGES IN THE LAYOUT --- */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/find-us" element={<FindUs />} />
        </Route>

        {/* --- ADMIN PAGES (Usually without the main Navbar) --- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;