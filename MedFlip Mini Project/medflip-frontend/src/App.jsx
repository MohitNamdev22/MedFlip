import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import { RecoilRoot } from 'recoil';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Navbar from './components/NavBar';

function App() {
  return (
    <RecoilRoot>
      <div style={{ width: "100vW", height: "100vh", backgroundColor: "gray" }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/admin/medication" element={<AdminDashboard />} />
            <Route path="/auth/login" element={<LoginForm />} />
            <Route path="/auth/register" element={<RegistrationForm />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

export default App;
