import React, { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

function Navbar() {
  const { theme, changeTheme, themes, themeName } = useContext(ThemeContext);
  const { isLoggedIn, logout, user } = useContext(AuthContext); // Get auth state and functions
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/login'); // Redirect to the login page after logout
  };

  // Define common link and button styles based on your theme
  const navLinkStyle = {
    color: theme.text,
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    transition: 'color 0.3s ease',
  };

  const buttonStyle = {
    padding: '0.4rem 0.7rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: theme.accent, // Use accent for buttons
    color: theme.primary, // Use primary for text on accent background
    fontWeight: 'bold',
    fontFamily: 'Georgia, serif',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    marginLeft: '1rem', // Add some margin between buttons/links
  };

  const buttonHoverStyle = {
    backgroundColor: theme.secondary, // A different color on hover
    color: theme.text, // Text color might change on hover
  };


  return (
    <nav
      style={{
        padding: '1rem 2rem',
        backgroundColor: theme.primary,
        color: theme.text,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: `0 2px 10px ${theme.accent}`,
        fontFamily: 'Georgia, serif',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}
    >
      {/* Left Links */}
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {/* You can add your main site title/logo here if you like, linking to home */}
        <Link to="/" style={navLinkStyle}>Home</Link>
        <Link to="/rooms" style={navLinkStyle}>Rooms</Link>
        <Link to="/contact" style={navLinkStyle}>Contact</Link>
        <Link to="/about" style={navLinkStyle}>About</Link>
      </div>

      {/* Right Section: Auth links and Theme Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isLoggedIn ? (
          <>
            <span style={{ color: theme.text, fontWeight: 'bold' }}>
              Welcome, {user?.username || 'User'}! {/* Display username if available */}
            </span>
            <button
              onClick={handleLogout}
              style={buttonStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button
                style={buttonStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
              >
                Login
              </button>
            </Link>
            <Link to="/register">
              <button
                style={buttonStyle}
                onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
                onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
              >
                Register
              </button>
            </Link>
          </>
        )}

        {/* Theme Selector */}
        <select
          value={themeName}
          onChange={(e) => changeTheme(e.target.value)}
          style={{
            padding: '0.4rem 0.7rem',
            borderRadius: '6px',
            border: `1px solid ${theme.accent}`,
            backgroundColor: theme.background,
            color: theme.primary,
            fontWeight: 'bold',
            fontFamily: 'Georgia, serif',
            cursor: 'pointer',
            marginLeft: '1rem', // Add margin to separate from auth buttons
          }}
          aria-label="Select Theme"
        >
          {Object.entries(themes).map(([key, value]) => (
            <option key={key} value={key}>
              {value.name}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}

export default Navbar;