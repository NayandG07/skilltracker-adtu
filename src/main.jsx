import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import './index.css';

// Register Service Worker for Offline Caching & Push Notifications
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('[SkillTracker] Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('[SkillTracker] Service Worker registration failed:', error);
      });
  });
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <StudentProvider>
            <App />
          </StudentProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
