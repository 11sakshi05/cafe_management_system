import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reservation = () => {
  // 1. STATE MANAGEMENT
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '10:00'
  });

  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);
  
  // PAYMENT STATES
  const [paymentMode, setPaymentMode] = useState('Pay After Visiting');
  const [isPaid, setIsPaid] = useState(false);

  // 2. FETCH MENU FROM BACKEND
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(res.data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      }
    };
    fetchMenu();
  }, []);

  // 3. CALCULATION LOGIC
  const subtotal = selectedItems.reduce((acc, item) => acc + Number(item.price), 0);
  const gst = subtotal * 0.18;
  const serviceCharge = subtotal * 0.02;
  const grandTotal = subtotal + gst + serviceCharge;

  // 4. HANDLERS
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const [hours] = formData.time.split(':').map(Number);
    if (hours < 8 || hours >= 23) {
      alert("Intermezzo is open from 08:00 AM to 11:00 PM.");
      return;
    }

    try {
      const payload = {
        ...formData,
        items: selectedItems,
        billAmount: grandTotal.toFixed(2),
        paymentMode: paymentMode,
        paymentStatus: isPaid ? 'Paid' : 'Pending' // Sending payment status to DB
      };

      const response = await axios.post('http://localhost:5000/api/reserve', payload);
      alert(response.data.message);
      
      // Reset everything after success
      setFormData({ name: '', email: '', date: '', time: '10:00' });
      setSelectedItems([]);
      setShowReceipt(false);
      setIsPaid(false);
      setPaymentMode('Pay After Visiting');
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Server Error"));
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#4A3728', textAlign: 'center', fontFamily: 'Playfair Display' }}>
        Table Reservation
      </h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        {!showReceipt ? (
          <>
            <input 
              name="name" type="text" placeholder="Your Name" required 
              style={inputStyle} value={formData.name} onChange={handleInputChange} 
            />
            
            <input 
              name="email" type="email" placeholder="Enter Your Email" required 
              style={inputStyle} value={formData.email} onChange={handleInputChange} 
            />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                name="date" type="date" required style={{...inputStyle, flex: 1}} 
                value={formData.date} onChange={handleInputChange} 
              />
              <input 
                name="time" type="time" required style={{...inputStyle, flex: 1}} 
                value={formData.time} onChange={handleInputChange} 
              />
            </div>

            <div style={menuSelectionBox}>
              <h4 style={{ margin: '0 0 10px 0', color: '#4A3728' }}>Pre-order Food (Optional)</h4>
              <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                {menuItems.map(item => (
                  <label key={item._id} style={checkboxLabel}>
                    <input 
                      type="checkbox" 
                      checked={selectedItems.some(i => i._id === item._id)}
                      onChange={(e) => {
                        if(e.target.checked) setSelectedItems([...selectedItems, item]);
                        else setSelectedItems(selectedItems.filter(i => i._id !== item._id));
                      }} 
                    /> {item.name} - ₹{item.price}
                  </label>
                ))}
              </div>
            </div>

            <button 
              type="button" 
              onClick={() => setShowReceipt(true)} 
              style={{ ...btnStyle, backgroundColor: '#DCAE96', color: '#4A3728' }}
            >
              Continue to Bill
            </button>
          </>
        ) : (
          <div style={fadeIn}>
            <div style={receiptBox}>
              <h3 style={receiptHeader}>Final Bill</h3>
              {selectedItems.length > 0 ? (
                selectedItems.map((item, idx) => (
                  <p key={idx} style={receiptText}>{item.name} <span>₹{item.price}</span></p>
                ))
              ) : (
                <p style={receiptText}>Table Booking Only <span>₹0.00</span></p>
              )}
              
              <hr style={divider} />
              <p style={receiptText}>Subtotal <span>₹{subtotal.toFixed(2)}</span></p>
              <p style={receiptText}>GST (18%) <span>₹{gst.toFixed(2)}</span></p>
              <p style={receiptText}>Service Charge (2%) <span>₹{serviceCharge.toFixed(2)}</span></p>
              
              <h4 style={totalText}>
                Grand Total <span>₹{grandTotal.toFixed(2)}</span>
              </h4>

              {/* PAYMENT MODE SELECTION */}
              <div style={{ marginTop: '15px', borderTop: '1px solid #DCAE96', paddingTop: '10px' }}>
                <p style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px' }}>Payment Method:</p>
                <label style={{ display: 'block', fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input type="radio" value="Pay After Visiting" checked={paymentMode === 'Pay After Visiting'} 
                    onChange={(e) => {setPaymentMode(e.target.value); setIsPaid(false);}} /> Pay at Cafe (Cash/Card)
                </label>
                <label style={{ display: 'block', fontSize: '0.85rem', cursor: 'pointer', marginTop: '5px' }}>
                  <input type="radio" value="Online Payment" checked={paymentMode === 'Online Payment'} 
                    onChange={(e) => setPaymentMode(e.target.value)} /> Online Payment (UPI)
                </label>
              </div>

              {/* QR CODE SECTION */}
              {paymentMode === 'Online Payment' && !isPaid && (
                <div style={{ textAlign: 'center', marginTop: '15px', backgroundColor: '#fff', padding: '15px', borderRadius: '10px', border: '1px solid #DCAE96' }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Scan to Pay ₹{grandTotal.toFixed(2)}</p>
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=intermezzo@upi&pn=Intermezzo&am=${grandTotal}&cu=INR`} 
                    alt="UPI QR" 
                    style={{ margin: '10px 0' }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setIsPaid(true)} 
                    style={{ padding: '8px', width: '100%', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    I have paid successfully
                  </button>
                </div>
              )}

              {isPaid && (
                <p style={{ color: 'green', fontSize: '0.85rem', textAlign: 'center', marginTop: '10px', fontWeight: 'bold' }}>
                  ✅ Payment Simulated Successfully
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button 
                type="button" 
                onClick={() => {setShowReceipt(false); setIsPaid(false);}} 
                style={{ ...btnStyle, backgroundColor: '#eee', color: '#666' }}
              >
                Back
              </button>
              
              {/* Conditional Confirm Button */}
              {(paymentMode === 'Pay After Visiting' || isPaid) ? (
                <button type="submit" style={btnStyle}>
                  Confirm Reservation
                </button>
              ) : (
                <button type="button" disabled style={{ ...btnStyle, backgroundColor: '#ccc', cursor: 'not-allowed' }}>
                  Pay to Confirm
                </button>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

// --- STYLES ---
const containerStyle = { maxWidth: '450px', margin: '40px auto', padding: '30px', backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #DCAE96', outline: 'none' };
const btnStyle = { padding: '15px', backgroundColor: '#4A3728', color: '#DCAE96', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', flex: 1 };
const menuSelectionBox = { border: '1px solid #DCAE96', padding: '15px', borderRadius: '10px', backgroundColor: '#FFF8F5' };
const checkboxLabel = { display: 'flex', alignItems: 'center', gap: '10px', margin: '8px 0', fontSize: '0.9rem', cursor: 'pointer' };
const receiptBox = { backgroundColor: '#FDECE4', padding: '20px', borderRadius: '10px', fontFamily: 'Courier New', border: '1px solid #DCAE96' };
const receiptHeader = { textAlign: 'center', margin: '0 0 15px 0', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px dashed #4A3728', paddingBottom: '10px' };
const receiptText = { display: 'flex', justifyContent: 'space-between', margin: '5px 0', fontSize: '0.9rem' };
const totalText = { display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: '#4A3728', fontSize: '1.1rem' };
const divider = { border: 'none', borderTop: '1px dashed #4A3728', margin: '10px 0' };
const fadeIn = { animation: 'fadeIn 0.4s ease-in' };

export default Reservation;