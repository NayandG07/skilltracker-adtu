import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = [
  { id: 'terracotta', name: 'Terracotta', description: 'Warm & earthy (default)', accent: '#d97757', accentDark: '#c15f3e', accentSubtle: 'rgba(217,119,87,0.10)', accentBorder: 'rgba(217,119,87,0.22)' },
  { id: 'ocean',      name: 'Ocean',      description: 'Deep & focused',           accent: '#2b7fff', accentDark: '#1a6be6', accentSubtle: 'rgba(43,127,255,0.10)',  accentBorder: 'rgba(43,127,255,0.22)' },
  { id: 'sage',       name: 'Sage',       description: 'Calm & natural',           accent: '#3e7b54', accentDark: '#2f6a44', accentSubtle: 'rgba(62,123,84,0.10)',   accentBorder: 'rgba(62,123,84,0.22)' },
  { id: 'amethyst',   name: 'Amethyst',   description: 'Bold & creative',          accent: '#7c3aed', accentDark: '#6b29d4', accentSubtle: 'rgba(124,58,237,0.10)',  accentBorder: 'rgba(124,58,237,0.22)' },
  { id: 'rose',       name: 'Rose',       description: 'Vibrant & energetic',      accent: '#e11d48', accentDark: '#c01140', accentSubtle: 'rgba(225,29,72,0.10)',   accentBorder: 'rgba(225,29,72,0.22)' },
  { id: 'slate',      name: 'Slate',      description: 'Minimal & professional',   accent: '#475569', accentDark: '#334155', accentSubtle: 'rgba(71,85,105,0.10)',   accentBorder: 'rgba(71,85,105,0.22)' },
];

// Safe fallback so HMR / context-less renders never crash
const FALLBACK = {
  theme: THEMES[0],
  themeId: 'terracotta',
  setTheme: () => {},
  themes: THEMES,
};

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [themeId, setThemeId] = useState(
    () => localStorage.getItem('skilltracker_theme') || 'terracotta'
  );
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];

  useEffect(() => {
    // Set data-theme on <html> — CSS handles the var overrides
    document.documentElement.dataset.theme = themeId;
    localStorage.setItem('skilltracker_theme', themeId);
  }, [themeId]);

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme: setThemeId, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext) ?? FALLBACK;