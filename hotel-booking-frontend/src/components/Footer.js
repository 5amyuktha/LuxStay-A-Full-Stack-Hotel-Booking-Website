import React from 'react';

const Footer = () => (
  <footer style={{
    textAlign: 'center',
    padding: '1rem 0',
    backgroundColor: '#000',   // black background
    color: '#fff',             // white text
    fontFamily: "'Georgia', serif",
    marginTop: 'auto',
  }}>
    <p style={{ margin: '0 0 0.5rem 0' }}>© 2025 The Grand Royale Hotel. All rights reserved.</p>
    <div style={{ fontSize: '1.5rem' }}>
      <span style={{ margin: '0 0.75rem', cursor: 'pointer' }} title="Facebook">📘</span>
      <span style={{ margin: '0 0.75rem', cursor: 'pointer' }} title="Twitter">🐦</span>
      <span style={{ margin: '0 0.75rem', cursor: 'pointer' }} title="Instagram">📸</span>
      <span style={{ margin: '0 0.75rem', cursor: 'pointer' }} title="LinkedIn">🔗</span>
    </div>
  </footer>
);

export default Footer;
