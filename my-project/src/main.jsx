import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './App.css';

import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = 'pk_test_cHJlcGFyZWQtZm94LTAuY2xlcmsuYWNjb3VudHMuZGV2JA';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
