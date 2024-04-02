import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div style={{width:"100vW", height:"100vh", backgroundColor:"gray"}} >
        <Router>
            <Routes>
                <Route path={"/admin/medication"} element={<AdminDashboard />}/>
                <Route path={"/auth/login"} element={<LoginForm />}/>
            </Routes>
        </Router>
        </div>
  );
}

export default App;
