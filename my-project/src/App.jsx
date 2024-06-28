import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Protected from './pages/Protected';
import Sidebar from './pages/Sidebar';
import Profile from './pages/Profile';
import Quotation from './pages/Quotation';
import Dash from './pages/Dash';
import Invoices from './pages/Invoives';
import InvEdit from './pages/Create/InvEdit';
import InvPrint from './pages/Create/Invprint';
import Edituser from './pages/Edituser';
import QuotEdit from './pages/Quot/QuotEdit';
import QuotPrint from './pages/Quot/QuotPrint';
import Greeting from './pages/Greeting';
import RestrictedModal from './RestrictedModal'; // Adjust import path as necessary

function App() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 824);
  const [isModalOpen, setIsModalOpen] = useState(!isLargeScreen);

  useEffect(() => {
    const handleResize = () => {
      const largeScreen = window.innerWidth >= 824;
      setIsLargeScreen(largeScreen);
      setIsModalOpen(!largeScreen);
    };

    // Initial resize check
    handleResize();

    // Interval to check every second
    const intervalId = setInterval(() => {
      handleResize();
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const checkAccess = (Component) => {
    return isLargeScreen ? <Component /> : <RestrictedModal isOpen={isModalOpen} onRequestClose={handleModalClose} />;
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={checkAccess(Signup)}  />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dash" 
          element={isLargeScreen ? <Protected Component={Sidebar} /> : <RestrictedModal isOpen={isModalOpen} onRequestClose={handleModalClose} />}
        >
          {/* Define nested routes for /dash */}
          <Route index element={checkAccess(Dash)} />
          <Route path="profile" element={checkAccess(Profile)} />
          <Route path="edituser" element={checkAccess(Edituser)} />
          <Route path="edituser/:id" element={checkAccess(Edituser)} />
          <Route path="invoice" element={checkAccess(Invoices)} />
          <Route path="quotation" element={checkAccess(Quotation)} />
          <Route path="greet" element={checkAccess(Greeting)} />
          <Route path="invoice/invedit" element={checkAccess(InvEdit)} />
          <Route path="invoice/invprint/:id" element={checkAccess(InvPrint)} />
          <Route path="quotation/quotedit" element={checkAccess(QuotEdit)} />
          <Route path="quotation/quotprint/:id" element={checkAccess(QuotPrint)} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
