import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';

import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = 'pk_test_cHJlcGFyZWQtZm94LTAuY2xlcmsuYWNjb3VudHMuZGV2JA';

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider frontendApi={PUBLISHABLE_KEY}> {/* Correct prop name is frontendApi */}
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
