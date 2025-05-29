import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const themes = {
  classic: {
    name: 'Classic',
    background: '#f5f1eb',
    primary: '#4b3b2b',
    secondary: '#a67c52',
    accent: '#d7bfae',
    text: '#3a2f2f',
  },
  royal: {
    name: 'Royal',
    background: '#f2f0f7',
    primary: '#3b2e5a',
    secondary: '#7a5f9e',
    accent: '#bfa6df',
    text: '#ffffff',
  },
  emerald: {
    name: 'Emerald',
    background: '#e9f3ee',
    primary: '#2f4f4f',
    secondary: '#6a8a7c',
    accent: '#a3c1ad',
    text: '#ffffff',
  },
  gold: {
    name: 'Gold',
    background: '#fff9f0',
    primary: '#bfa14a',
    secondary: '#e5d08a',
    accent: '#fff6c1',
    text: '#3a2f1d',
  },
  midnight: {
    name: 'Midnight',
    background: '#1a1a2e',
    primary: '#16213e',
    secondary: '#0f3460',
    accent: '#e94560',
    text: '#ffffff',
  },
  sapphire: {
    name: 'Sapphire',
    background: '#eef6fb',
    primary: '#073b4c',
    secondary: '#118ab2',
    accent: '#06d6a0',
    text: '#ffffff',
  },
  velvet: {
    name: 'Velvet',
    background: '#fceff9',
    primary: '#6a0572',
    secondary: '#ab83a1',
    accent: '#d9c4dd',
    text: '#ffffff',
  }
};

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState('classic');

  useEffect(() => {
    const storedTheme = localStorage.getItem('themeName');
    if (storedTheme && themes[storedTheme]) {
      setThemeName(storedTheme);
    }
  }, []);

  const changeTheme = (name) => {
    if (themes[name]) {
      setThemeName(name);
      localStorage.setItem('themeName', name);
    }
  };

  const theme = themes[themeName];

  return (
    <ThemeContext.Provider value={{ theme, themeName, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
