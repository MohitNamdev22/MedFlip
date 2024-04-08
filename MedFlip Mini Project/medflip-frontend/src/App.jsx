import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import { RecoilRoot } from 'recoil';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Navbar from './components/NavBar';
import MedicationList from './components/MedicationList';
import Checkout from './components/Checkout';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <RecoilRoot>
      <CartProvider>
      <div style={{ width: "100vW", height: "100vh", backgroundColor: "gray" }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<MedicationList/>}/>
            <Route path="/admin/medication" element={<AdminDashboard />} />
            <Route path="/auth/login" element={<LoginForm />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth/register" element={<RegistrationForm />} />
          </Routes>
        </Router>
      </div>
      </CartProvider>
    </RecoilRoot>
  );
}

export default App;


