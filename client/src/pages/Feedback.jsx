

// import React, { useState } from 'react';

// // 1. PLACE THE REVIEW CARD COMPONENT HERE (Outside the main function)
// const ReviewCard = ({ rev }) => (
//   <div style={reviewCardStyle} className="menu-card">
//     <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
//       <div style={{ 
//         width: '40px', height: '40px', borderRadius: '50%', 
//         backgroundColor: '#DCAE96', color: '#fff', 
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         fontWeight: 'bold', flexShrink: 0 // Prevents the circle from squishing
//       }}>
//         {rev.name.charAt(0)}
//       </div>
//       <div>
//         <h4 style={{ margin: 0, color: '#4A3728' }}>{rev.name}</h4>
//         <div style={{ color: '#FFD700', fontSize: '0.8rem' }}>{"★".repeat(rev.rating)}</div>
//       </div>
//     </div>
//     <p style={{ fontStyle: 'italic', color: '#666', margin: '5px 0 0 55px' }}>"{rev.comment}"</p>
//   </div>
// );

// const Feedback = () => {
//   const [reviews] = useState([
//     { id: 1, name: "Aarav Mehta", rating: 5, comment: "The Rose Gold Latte is a masterpiece! Highly recommended." },
//     { id: 2, name: "Isha Sharma", rating: 4, comment: "Beautiful aesthetic and very peaceful vibe." },
//     { id: 3, name: "Sakshi K.", rating: 5, comment: "Love the brownish-pinkish theme. Very professional." }
//   ]);

//   return (
//     <div style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto' }}>
//       <h1 style={{ textAlign: 'center', color: '#4A3728', marginBottom: '40px' }}>Guest Experiences</h1>
      
//       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
        
//         {/* LEFT SIDE: FORM */}
//         <div className="glass-card" style={{ padding: '30px', height: 'fit-content' }}>
//           <h3 style={{ color: '#4A3728', marginBottom: '20px' }}>Leave a Review</h3>
//           <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//             <input type="text" placeholder="Full Name" style={inputStyle} />
//             <input type="email" placeholder="Email Address" style={inputStyle} />
//             <select style={inputStyle}>
//               <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
//               <option value="4">⭐⭐⭐⭐ (Good)</option>
//               <option value="3">⭐⭐⭐ (Average)</option>
//             </select>
//             <textarea placeholder="Share your experience..." rows="4" style={inputStyle}></textarea>
//             <button className="btn-elegant">Submit Review</button>
//           </form>
//         </div>

//         {/* RIGHT SIDE: REVIEWS LIST */}
//         <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '15px' }}>
//           <h3 style={{ color: '#4A3728', marginBottom: '20px' }}>What Others Say</h3>
          
//           {/* 2. CALL THE REVIEW CARD HERE */}
//           {reviews.map((rev) => (
//             <ReviewCard key={rev.id} rev={rev} />
//           ))}
//         </div>

//       </div>
//     </div>
//   );
// };

// // Styles (Ensure these are defined at the bottom)
// const inputStyle = { padding: '12px', borderRadius: '12px', border: '1px solid rgba(220, 174, 150, 0.5)', outline: 'none', background: 'white' };
// const reviewCardStyle = { background: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };

// export default Feedback;

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls

// 1. REUSABLE REVIEW CARD (Stays the same for aesthetics)
const ReviewCard = ({ rev }) => (
  <div style={reviewCardStyle} className="menu-card">
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
      <div style={{ 
        width: '40px', height: '40px', borderRadius: '50%', 
        backgroundColor: '#DCAE96', color: '#fff', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 'bold', flexShrink: 0 
      }}>
        {rev.name.charAt(0)}
      </div>
      <div>
        <h4 style={{ margin: 0, color: '#4A3728' }}>{rev.name}</h4>
        {/* Render stars based on the rating number */}
        <div style={{ color: '#FFD700', fontSize: '0.8rem' }}>{"★".repeat(rev.rating)}</div>
      </div>
    </div>
    <p style={{ fontStyle: 'italic', color: '#666', margin: '5px 0 0 55px' }}>"{rev.comment}"</p>
  </div>
);

const Feedback = () => {
  // 2. STATE FOR DYNAMIC DATA
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  // 3. FETCH REVIEWS FROM BACKEND ON LOAD
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reviews');
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  // 4. HANDLE SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/reviews', formData);
      
      // Update the UI immediately by adding the new review to the list
      setReviews([res.data, ...reviews]); 
      
      // Reset form
      setFormData({ name: '', rating: 5, comment: '' });
      alert("Thank you! Your feedback is live.");
    } catch (err) {
      alert("Oops! Could not save your review.");
    }
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#4A3728', marginBottom: '40px' }}>Guest Experiences</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
        
        {/* LEFT SIDE: FORM */}
        <div className="glass-card" style={{ padding: '30px', height: 'fit-content' }}>
          <h3 style={{ color: '#4A3728', marginBottom: '20px' }}>Leave a Review</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text" 
              placeholder="Full Name" 
              style={inputStyle} 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            
            <select 
              style={inputStyle} 
              value={formData.rating}
              onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
            >
              <option value="5">⭐⭐⭐⭐⭐ (Excellent)</option>
              <option value="4">⭐⭐⭐⭐ (Good)</option>
              <option value="3">⭐⭐⭐ (Average)</option>
              <option value="2">⭐⭐ (Fair)</option>
              <option value="1">⭐ (Poor)</option>
            </select>

            <textarea 
              placeholder="Share your experience..." 
              rows="4" 
              style={inputStyle} 
              required
              value={formData.comment}
              onChange={(e) => setFormData({...formData, comment: e.target.value})}
            ></textarea>
            
            <button type="submit" className="btn-elegant">Submit Review</button>
          </form>
        </div>

        {/* RIGHT SIDE: REVIEWS LIST */}
        <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '15px' }}>
          <h3 style={{ color: '#4A3728', marginBottom: '20px' }}>What Others Say</h3>
          
          {reviews.length === 0 ? (
            <p style={{ color: '#999' }}>No reviews yet. Be the first!</p>
          ) : (
            reviews.map((rev) => (
              // Use _id from MongoDB as the key
              <ReviewCard key={rev._id} rev={rev} />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

// Styles
const inputStyle = { padding: '12px', borderRadius: '12px', border: '1px solid rgba(220, 174, 150, 0.5)', outline: 'none', background: 'white' };
const reviewCardStyle = { background: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' };

export default Feedback;