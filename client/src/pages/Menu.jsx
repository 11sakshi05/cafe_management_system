import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // FIXED: Added missing state

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Filter logic
  const filteredItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: '#4A3728' }}>Loading Intermezzo Menu...</h2>;

  // Helper function to render a single menu card
  const renderCard = (item) => (
    <div key={item._id} style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, color: '#4A3728' }}>{item.name}</h3>
        <span style={{ fontWeight: 'bold', color: '#DCAE96' }}>₹{item.price}</span>
      </div>
      <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>{item.desc}</p>
      <span style={badgeStyle}>{item.category}</span>
    </div>
  );

  return (
    <div style={{ padding: '50px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#4A3728', fontFamily: 'Playfair Display', marginBottom: '10px' }}>Intermezzo Nashik</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Freshly brewed moments & delicious bites</p>

      {/* --- SEARCH BAR --- */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
        <input 
          type="text" 
          placeholder="Search for coffee, snacks..." 
          style={searchBarStyle}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* --- CONDITIONAL RENDERING --- */}
      {searchTerm !== '' ? (
        // SHOW SEARCH RESULTS
        <section>
          <h2 style={categoryHeaderStyle}>Search Results ({filteredItems.length})</h2>
          <div style={gridStyle}>
            {filteredItems.map(item => renderCard(item))}
          </div>
          {filteredItems.length === 0 && (
            <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>No dishes found matching "{searchTerm}"</p>
          )}
        </section>
      ) : (
        // SHOW CATEGORIZED MENU
        <>
          {/* --- BEVERAGES SECTION --- */}
          <h2 style={categoryHeaderStyle}>☕ Beverages</h2>
          <div style={gridStyle}>
            {menuItems
              .filter(item => ['Beverages', 'Coffee', 'Tea'].includes(item.category))
              .map(item => renderCard(item))}
          </div>

          {/* --- FOOD SECTION --- */}
          <h2 style={{ ...categoryHeaderStyle, marginTop: '60px' }}>🍔 Food & Savories</h2>
          <div style={gridStyle}>
            {menuItems
              .filter(item => ['Food', 'Savories', 'Desserts'].includes(item.category))
              .map(item => renderCard(item))}
          </div>
        </>
      )}
    </div>
  );
};

// --- STYLES ---
const gridStyle = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
  gap: '30px' 
};

const searchBarStyle = { 
  padding: '12px 25px', 
  width: '100%', 
  maxWidth: '500px',
  borderRadius: '50px', 
  border: '2px solid #DCAE96', 
  outline: 'none', 
  fontSize: '1rem',
  boxShadow: '0 4px 10px rgba(220, 174, 150, 0.2)'
};

const categoryHeaderStyle = { 
  color: '#4A3728', 
  borderBottom: '2px solid #DCAE96', 
  paddingBottom: '10px', 
  marginBottom: '30px',
  fontFamily: 'Playfair Display'
};

const cardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
  borderLeft: '5px solid #DCAE96' 
};

const badgeStyle = { 
  fontSize: '0.7rem', 
  background: '#FFF8F5', 
  padding: '2px 8px', 
  borderRadius: '20px',
  color: '#DCAE96',
  textTransform: 'uppercase',
  fontWeight: 'bold'
};

export default Menu;