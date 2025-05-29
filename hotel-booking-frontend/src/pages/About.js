import React, { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';

function About() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        maxWidth: '800px',
        margin: '3rem auto',
        padding: '3rem 2rem',
        borderRadius: '14px',
        boxShadow: `0 0 25px ${theme.accent}`,
        fontFamily: "'Georgia', serif",
        lineHeight: '1.6',
      }}
    >
      <h1
        style={{
          color: theme.primary,
          fontSize: '3rem',
          marginBottom: '0.5rem',
          animation: 'fadeInDown 1s ease',
        }}
      >
        About Our Hotel
      </h1>
      <p
        style={{
          color: theme.accent,
          fontSize: '1.25rem',
          fontWeight: '600',
          marginBottom: '2rem',
          animation: 'fadeIn 1.5s ease',
        }}
      >
        Where luxury meets comfort.
      </p>

      {/* Bold black paragraphs below */}
      <p style={{ fontWeight: '700', color: 'black' }}>
        Nestled in the heart of the city, our hotel offers a perfect blend of timeless elegance and modern luxury.
        From spacious rooms to top-notch service, we ensure every guest feels like royalty.
      </p>
      <p style={{ fontWeight: '700', color: 'black' }}>
        Whether you're here for a relaxing vacation or an important business trip, our facilities and hospitality
        make your stay unforgettable. Discover gourmet dining, world-class spa treatments, and breathtaking views.
      </p>
      <p style={{ fontWeight: '700', color: 'black' }}>
        Come, be our guest, and experience a stay that redefines indulgence.
      </p>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes fadeInDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}

export default About;
