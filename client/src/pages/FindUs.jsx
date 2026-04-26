// import React from 'react';

// const FindUs = () => {
//   return (
//     <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#FFF8F5', minHeight: '100vh' }}>
//       <h1 style={{ color: '#4A3728', fontFamily: 'Playfair Display', marginBottom: '10px' }}>Visit Intermezzo</h1>
//       <p style={{ color: '#666', marginBottom: '30px' }}>Experience the finest brews in the heart of Nashik.</p>
      
//       {/* GOOGLE MAP EMBED */}
//       <div style={{ 
//         maxWidth: '900px', 
//         margin: '0 auto', 
//         borderRadius: '20px', 
//         overflow: 'hidden', 
//         boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//         border: '5px solid #fff' 
//       }}>
//         <iframe 
//     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.256885827364!2d73.77900467592477!3d19.9821072814187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb003d5eae51%3A0x405640c5cd9f219d!2sFour%20Points%20by%20Sheraton%20Nashik!5e0!3m2!1sen!2sin!4v1711654321000!5m2!1sen!2sin" 
//     width="100%" 
//     height="450" 
//     style={{ border: 0 }} 
//     allowFullScreen="" 
//     loading="lazy" 
//     referrerPolicy="no-referrer-when-downgrade">
//   </iframe>
//       </div>
      
//       {/* CONTACT DETAILS */}
//       <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '900px', margin: '40px auto 0' }}>
//         <div style={infoBox}>
//           <h4 style={{ color: '#4A3728', margin: '0 0 10px 0' }}>📍 Location</h4>
//           <p style={{ color: '#666', fontSize: '0.9rem' }}>Yashika Plaza, Plot No.2 S No. 804/A, behind Satyam Sweets, Mumbai Naka, Govind Nagar, Nashik, Maharashtra 422009</p>
//         </div>
//         <div style={infoBox}>
//           <h4 style={{ color: '#4A3728', margin: '0 0 10px 0' }}>📞 Contact</h4>
//           <p style={{ color: '#666', fontSize: '0.9rem' }}>+91 9225099412</p>
//         </div>
//         <div style={infoBox}>
//           <h4 style={{ color: '#4A3728', margin: '0 0 10px 0' }}>⏰ Hours</h4>
//           <p style={{ color: '#666', fontSize: '0.9rem' }}>08:00 AM - 11:00 PM</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const infoBox = { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' };

// export default FindUs;

import React from 'react';

const FindUs = () => {
  const infoBox = { 
    backgroundColor: '#fff', 
    padding: '20px', 
    borderRadius: '15px', 
    boxShadow: '0 4px 10px rgba(0,0,0,0.03)' 
  };

  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#FFF8F5', minHeight: '100vh' }}>
      <h1 style={{ color: '#4A3728', fontFamily: 'Playfair Display', marginBottom: '10px' }}>Visit Intermezzo</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Experience the finest brews in the heart of Nashik.</p>
      
      {/* GOOGLE MAP EMBED FOR INTERMEZZO NASHIK */}
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        borderRadius: '20px', 
        overflow: 'hidden', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        border: '5px solid #fff' 
      }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.256885827364!2d73.77900467592477!3d19.9821072814187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb003d5eae51%3A0x405640c5cd9f219d!2sFour%20Points%20by%20Sheraton%20Nashik!5e0!3m2!1sen!2sin!4v1711654321000!5m2!1sen!2sin" 
          width="100%" 
          height="450" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
      
      {/* CONTACT DETAILS */}
      <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '900px', margin: '40px auto 0' }}>
        <div style={infoBox}>
          <h4 style={{ color: '#4A3728', margin: '0 0 10px 0' }}>📍 Location</h4>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            Yashika Plaza, Govind Nagar, Nashik, Maharashtra 422009
          </p>
        </div>
        <div style={infoBox}>
          <h4 style={{ color: '#4A3728', margin: '0 0 10px 0' }}>📞 Contact</h4>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>+91 9225099412</p>
        </div>
        <div style={infoBox}>
          <h4 style={{ color: '#4A3728', margin: '0 0 10px 0' }}>⏰ Hours</h4>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>08:00 AM - 11:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default FindUs;