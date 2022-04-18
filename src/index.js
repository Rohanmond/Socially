import React from 'react';
import './index.css';
import App from './App';
import { makeServer } from './server';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

// Call make Server
makeServer();
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
