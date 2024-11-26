import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("[Main] Environment:", {
  baseUrl: import.meta.env?.VITE_BASE_URL || '/',
  mode: import.meta.env?.MODE,
  dev: import.meta.env?.DEV,
  prod: import.meta.env?.PROD,
  origin: window.location.origin,
  pathname: window.location.pathname
});

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error('[Fatal] Failed to find the root element');
  }

  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('[Fatal] Application failed to initialize:', error);
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Application failed to load. Please check console for details.</div>';
}