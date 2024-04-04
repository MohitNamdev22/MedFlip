import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isAuthenticatedSelector, userNameSelector } from './AuthState';
import './NavBar.css';

function Navbar() {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const userName = useRecoilValue(userNameSelector);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
  console.log("userName state updated:", userName);
  setIsLoaded(true)
}, [userName]); // Empty dependency array ensures this effect runs only once after initial mount

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/admin/medication" className="navbar-link">Admin Dashboard</Link>
          </li>
        )}
        <li>
          <Link to="/auth/login" className="navbar-link">Login</Link>
        </li>
        <li>
          <Link to="/auth/register" className="navbar-link">Register</Link>
        </li>
      </ul>
      {isLoaded && isAuthenticated && (
        <div>Hello, {userName}</div>
      )}
    </nav>
  );
}

export default Navbar;
