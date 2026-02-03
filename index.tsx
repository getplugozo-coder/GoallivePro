
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("GoalLive Pro: App Rendered");
  } catch (err) {
    console.error("Render error:", err);
    rootElement.innerHTML = `<div style="padding: 20px; text-align: center;">Failed to load application. Check console.</div>`;
  }
}
