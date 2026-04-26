import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  // 1. STATE MANAGEMENT
  const [activeTab, setActiveTab] = useState('reservations'); 
  const [reservations, setReservations] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [newDish, setNewDish] = useState({ name: '', price: '', category: 'Coffee', desc: '' });
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', price: '', category: '', desc: '' });

  // SEARCH STATES
  const [resSearch, setResSearch] = useState('');
  const [menuSearch, setMenuSearch] = useState('');

  const fetchData = async () => {
    try {
      const resRes = await axios.get('http://localhost:5000/api/reservations');
      const resMenu = await axios.get('http://localhost:5000/api/menu');
      setReservations(resRes.data);
      setMenuItems(resMenu.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // FILTER LOGIC
  const filteredReservations = reservations.filter(res => {
    const name = res.name ? res.name.toLowerCase() : "";
    const email = res.email ? res.email.toLowerCase() : ""; 
    const search = resSearch.toLowerCase();
    return name.includes(search) || email.includes(search);
  });

  const filteredMenu = menuItems.filter(item => 
    item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
    item.category.toLowerCase().includes(menuSearch.toLowerCase())
  );

  // ACTION HANDLERS
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/reservations/${id}`, { status: newStatus });
      fetchData();
    } catch (err) {
      alert("Error updating status");
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/menu', newDish);
      fetchData(); 
      setNewDish({ name: '', price: '', category: 'Coffee', desc: '' });
      alert("New dish added to Inter.mezzo Menu!");
    } catch (err) {
      alert("Error adding dish");
    }
  };

  const handleDeleteDish = async (id) => {
    if(window.confirm("Remove this dish?")) {
      try {
        await axios.delete(`http://localhost:5000/api/menu/${id}`);
        fetchData();
      } catch (err) {
        alert("Error deleting dish");
      }
    }
  };

  const startEditing = (item) => {
    setEditingId(item._id);
    setEditFormData({ name: item.name, price: item.price, category: item.category, desc: item.desc });
  };

  const handleSaveEdit = async (id) => {
    try {
        await axios.put(`http://localhost:5000/api/menu/${id}`, editFormData);
        setEditingId(null); 
        fetchData(); 
        alert("Menu updated successfully!");
    } catch (err) {
        alert("Failed to update item");
    }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#FFF8F5', minHeight: '100vh', fontFamily: 'Poppins' }}>
      <h1 style={{ color: '#4A3728', textAlign: 'center', marginBottom: '30px' }}>Inter.mezzo Admin Panel</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
        <button onClick={() => setActiveTab('reservations')} style={activeTab === 'reservations' ? activeTabStyle : inactiveTabStyle}>🗓️ Reservations</button>
        <button onClick={() => setActiveTab('menu')} style={activeTab === 'menu' ? activeTabStyle : inactiveTabStyle}>📖 Menu Manager</button>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* TAB 1: RESERVATIONS */}
        {activeTab === 'reservations' && (
          <section style={fadeIn}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ ...sectionTitle, margin: 0 }}>Reservation Requests</h2>
              <input type="text" placeholder="Search name or email..." style={adminSearchStyle} onChange={(e) => setResSearch(e.target.value)} />
            </div>
            <div style={tableContainer}>
              <table style={tableStyle}>
                <thead style={theadStyle}>
                  <tr>
                    <th style={tdStyle}>Customer</th>
                    <th style={tdStyle}>Order Details</th>
                    <th style={tdStyle}>Total Bill</th>
                    <th style={tdStyle}>Date & Time</th>
                    <th style={tdStyle}>Payment</th> {/* New Column */}
                    <th style={tdStyle}>Status</th>
                    <th style={tdStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map(res => (
                    <tr key={res._id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={tdStyle}>
                        <b>{res.name}</b><br/>
                        <small>{res.email}</small>
                      </td>
                      <td style={tdStyle}>
                        {res.items && res.items.length > 0 ? (
                          <ul style={{ fontSize: '0.8rem', paddingLeft: '15px', margin: 0 }}>
                            {res.items.map((item, idx) => <li key={idx}>{item.name}</li>)}
                          </ul>
                        ) : <span style={{color: '#999', fontSize: '0.8rem'}}>Table Only</span>}
                      </td>
                      <td style={tdStyle}>₹{res.billAmount || '0.00'}</td>
                      <td style={tdStyle}>{res.date} at {res.time}</td>
                      <td style={tdStyle}>
                        <span style={{ fontSize: '0.8rem' }}>{res.paymentMode || 'N/A'}</span><br/>
                        <b style={{ color: res.paymentStatus === 'Paid' ? 'green' : 'orange' }}> {res.paymentStatus || 'Pending'} </b>
                      </td>
                      <td style={{ ...tdStyle, color: res.status === 'Accepted' ? 'green' : '#DCAE96', fontWeight: 'bold' }}>{res.status}</td>
                      <td style={tdStyle}>
                        {res.status === 'Pending' && (
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => handleUpdateStatus(res._id, 'Accepted')} style={{ ...actionBtn, backgroundColor: '#4CAF50' }}>Accept</button>
                            <button onClick={() => handleUpdateStatus(res._id, 'Rejected')} style={{ ...actionBtn, backgroundColor: '#f44336' }}>Reject</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 2: MENU MANAGER (Restored to Original Logic) */}
        {activeTab === 'menu' && (
          <div style={fadeIn}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '30px', alignItems: 'start' }}>
              
              <section style={sectionStyle}>
                <h2 style={sectionTitle}>✨ Add New Dish</h2>
                <form onSubmit={handleAddDish} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <input type="text" placeholder="Dish Name" required style={inputStyle} value={newDish.name} onChange={(e) => setNewDish({...newDish, name: e.target.value})} />
                  <input type="number" placeholder="Price (₹)" required style={inputStyle} value={newDish.price} onChange={(e) => setNewDish({...newDish, price: e.target.value})} />
                  <select style={inputStyle} value={newDish.category} onChange={(e) => setNewDish({...newDish, category: e.target.value})}>
                    <option value="Coffee">Coffee</option>
                    <option value="Tea">Tea</option>
                    <option value="Food">Food</option>
                    <option value="Savories">Savories</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                  <textarea placeholder="Description" required style={{...inputStyle, height: '80px'}} value={newDish.desc} onChange={(e) => setNewDish({...newDish, desc: e.target.value})} />
                  <button type="submit" style={addBtnStyle}>Add to Menu</button>
                </form>
              </section>

              <section style={sectionStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ ...sectionTitle, margin: 0 }}>📖 Current Menu</h2>
                  <input type="text" placeholder="Search menu..." style={adminSearchStyle} onChange={(e) => setMenuSearch(e.target.value)} />
                </div>
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  <table style={tableStyle}>
                    <thead style={theadStyle}>
                      <tr>
                        <th style={tdStyle}>Name</th>
                        <th style={tdStyle}>Category</th>
                        <th style={tdStyle}>Price</th>
                        <th style={tdStyle}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMenu.map(item => (
                        <tr key={item._id} style={{ borderBottom: '1px solid #eee' }}>
                          {editingId === item._id ? (
                            <>
                              <td style={tdStyle}><input style={miniInput} value={editFormData.name} onChange={(e) => setEditFormData({...editFormData, name: e.target.value})} /></td>
                              <td style={tdStyle}>
                                <select style={miniInput} value={editFormData.category} onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}>
                                  <option value="Coffee">Coffee</option><option value="Tea">Tea</option><option value="Food">Food</option><option value="Savories">Savories</option><option value="Desserts">Desserts</option><option value="Beverages">Beverages</option>
                                </select>
                              </td>
                              <td style={tdStyle}><input type="number" style={miniInput} value={editFormData.price} onChange={(e) => setEditFormData({...editFormData, price: e.target.value})} /></td>
                              <td style={tdStyle}>
                                <button onClick={() => handleSaveEdit(item._id)} style={saveBtnStyle}>Save</button>
                                <button onClick={() => setEditingId(null)} style={cancelBtnStyle}>Cancel</button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td style={tdStyle}>{item.name}</td>
                              <td style={tdStyle}><span style={categoryBadgeStyle}>{item.category}</span></td>
                              <td style={tdStyle}>₹{item.price}</td>
                              <td style={tdStyle}>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                  <button onClick={() => startEditing(item)} style={editBtnStyle}>Edit</button>
                                  <button onClick={() => handleDeleteDish(item._id)} style={deleteBtnStyle}>Remove</button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- STYLES ---
const adminSearchStyle = { padding: '8px 15px', borderRadius: '8px', border: '1px solid #DCAE96', outline: 'none', width: '200px' };
const sectionStyle = { backgroundColor: '#fff', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };
const sectionTitle = { color: '#4A3728', marginBottom: '20px', fontSize: '1.4rem' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #DCAE96', outline: 'none' };
const addBtnStyle = { padding: '12px', backgroundColor: '#4A3728', color: '#DCAE96', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' };
const theadStyle = { background: '#4A3728', color: '#fff' };
const tdStyle = { padding: '15px', textAlign: 'left' };
const actionBtn = { padding: '8px 15px', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.8rem' };
const deleteBtnStyle = { backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' };
const activeTabStyle = { padding: '12px 25px', backgroundColor: '#4A3728', color: '#DCAE96', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' };
const inactiveTabStyle = { padding: '12px 25px', backgroundColor: '#FDECE4', color: '#4A3728', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' };
const tableContainer = { backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' };
const fadeIn = { animation: 'fadeIn 0.5s ease-in' };
const miniInput = { padding: '5px', borderRadius: '4px', border: '1px solid #DCAE96', width: '90%', outline: 'none' };
const saveBtnStyle = { backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' };
const cancelBtnStyle = { backgroundColor: '#9e9e9e', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.75rem', marginLeft: '5px' };
const editBtnStyle = { backgroundColor: '#4A3728', color: '#DCAE96', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' };
const categoryBadgeStyle = { fontSize: '0.7rem', background: '#FDECE4', padding: '3px 8px', borderRadius: '12px', color: '#4A3728', fontWeight: 'bold' };

export default Dashboard;