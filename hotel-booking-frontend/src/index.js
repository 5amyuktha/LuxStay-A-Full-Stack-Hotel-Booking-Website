import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Your global styles
import App from './App';
import { ThemeProvider } from './context/themeContext'; // Import ThemeProvider
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* AuthProvider wraps everything that needs auth context */}
      <ThemeProvider> {/* ThemeProvider wraps everything that needs theme context */}
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);