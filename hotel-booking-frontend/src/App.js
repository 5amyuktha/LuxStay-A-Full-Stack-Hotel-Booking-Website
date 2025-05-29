import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Import useLocation

import Rooms from './pages/Rooms';
import Booking from './pages/Booking';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';

import Login from './pages/Login';
import Register from './pages/Register';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import { ThemeContext } from './context/themeContext';
// AuthProvider is now in index.js, so no need to import/use it here

// Create a component that will conditionally render the Navbar
function AppContent() {
  const { theme } = useContext(ThemeContext);
  const location = useLocation(); // Get current location
  
  // Define paths where Navbar should be hidden
  const hideNavbarPaths = ['/login', '/register']; 
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div
      style={{
        backgroundColor: theme.background,
        minHeight: '100vh',
        color: theme.primary,
      }}
    >
      {!shouldHideNavbar && <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes - Wrap these with PrivateRoute */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/rooms" element={<PrivateRoute><Rooms /></PrivateRoute>} />
        <Route path="/booking/:roomId" element={<PrivateRoute><Booking /></PrivateRoute>} />
        <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
        <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />

        {/* Fallback route - Redirect to home if path not found */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;