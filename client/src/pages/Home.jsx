// import React from 'react';

// const Home = () => {
//   return (
//     <div style={{ padding: '0' }}>
//       {/* Hero Section */}
      
//       <section style={{
//         height: '60vh',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#DCAE96', // Dusty Rose
//         color: '#4A3728'           // Espresso
//       }}>
//         <h1 style={{ fontSize: '4rem', marginBottom: '40px' }}>Elysian Brews</h1>
//         <p style={{ fontSize: '1.5rem', fontStyle: 'italic' }}>"Where Every Sip Finds its Sanctuary"</p>
//         <button style={{
//           marginTop: '20px',
//           padding: '10px 30px',
//           backgroundColor: '#4A3728',
//           color: '#FFF8F5',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer'
//         }}>
//           Explore Menu
//         </button>
//       </section>

//       {/* About Section */}
//       <section style={{ padding: '50px', textAlign: 'center', backgroundColor: '#FFF8F5' }}>
//         <h2 style={{ color: '#4A3728' }}>Our Story</h2>
//         <p style={{ maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
//           At Elysian Brews, we believe coffee is more than just a drink—it's an experience. 
//           Our minimalistic space is designed for thinkers, creators, and coffee lovers.
//         </p>
//       </section>
//     </div>
//   );
// };

// export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const heroStyle = {
    height: '80vh',
    // High-quality coffee shop image with a dark espresso-tinted overlay
    backgroundImage: `linear-gradient(rgba(74, 55, 40, 0.6), rgba(74, 55, 40, 0.6)), 
                      url('https://dt4l9bx31tioh.cloudfront.net/eazymedia/restaurant/700272/restaurant120250403044419.jpeg?width=818&height=450&mode=fit?format=auto&quality=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF8F5', // Soft Cream text
    textAlign: 'center',
    padding: '0 20px'
  };

  return (
    <div style={{ padding: '0' }}>
      {/* Hero Section */}
      <section style={heroStyle}>
        <h1 style={{ 
          fontSize: '4.5rem', 
          marginBottom: '10px', 
          fontFamily: 'Playfair Display, serif',
          textShadow: '2px 2px 10px rgba(0,0,0,0.3)' 
        }}>
         Inter.mezzo - Four Points By Sheraton 
        </h1>
        <p style={{ 
          fontSize: '1.5rem', 
          fontStyle: 'italic', 
          maxWidth: '700px',
          color: '#DCAE96' // Accenting the tagline with Dusty Rose
        }}>
          "One Shelf, Many Stories"
        </p>
        
        {/* Using the elegant button class from your CSS */}
        <button 
          className="btn-elegant" 
          style={{ marginTop: '30px' }}
          onClick={() => navigate('/menu')}
        >
          Explore Menu
        </button>
      </section>

      {/* About Section */}
      <section style={{ 
        padding: '80px 20px', 
        textAlign: 'center', 
        backgroundColor: '#FFF8F5' 
      }}>
        <h2 style={{ 
          color: '#4A3728', 
          fontSize: '2.5rem', 
          marginBottom: '20px' 
        }}>
          Our Story
        </h2>
        <p style={{ 
          maxWidth: '700px', 
          margin: '0 auto', 
          lineHeight: '1.8', 
          fontSize: '1.1rem',
          color: '#555'
        }}>
          Located at the lobby level of Four Points by Sheraton Nashik, InterMezzo offers a cozy and vibrant 
          setting for casual meetups or a moment of relaxation. Savor a wide range of 
          premium coffees, teas, and Nitro brews, paired with delectable small bites. 
          Our curated menu also features expertly crafted cocktails, local craft beers, and fine wines. 
          Whether you're catching up with friends or taking a break during a busy day, 
          Inter.Mezzo is the perfect spot to unwind and enjoy the little things.
        </p>
      </section>
    </div>
  );
};

export default Home;