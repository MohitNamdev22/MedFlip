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
import  Payment  from './components/Payment'

function App() {
  return (
    <RecoilRoot>
      <CartProvider>
        <div style={{ width: "100vW", height: "100vh", backgroundColor: "rgb(233 233 233);" }}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<MedicationList/>}/>
              <Route path="/admin/medication" element={<AdminDashboard />} />
              <Route path="/auth/login" element={<LoginForm />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/auth/register" element={<RegistrationForm />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </Router>
          {/* Copyright and developer statement */}
          <div style={{ textAlign: "center", padding: "5px 0px", height:"50px", backgroundColor: "#333", color: "#fff" }}>
          © 2024 All rights reserved<br></br>Designed & Developed by{' '}
          <a href="https://github.com/MohitNamdev22" style={{ fontWeight: "bold", color: "#fff", textDecoration: "none" }}>
              Mohit Namdev
            </a>
          </div>
        </div>
      </CartProvider>
    </RecoilRoot>
  );
}

export default App;
