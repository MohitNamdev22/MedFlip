import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon
import { isAuthenticatedSelector, userNameSelector } from './AuthState';
import './NavBar.css';
import logo from '../assets/logo.png'

import { useCart } from './CartContext';

function Navbar() {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const userName = useRecoilValue(userNameSelector);
  const [isLoaded, setIsLoaded] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    console.log("userName state updated:", userName);
    setIsLoaded(true);
  }, [userName]);

  return (
    <nav className="navbar">
      <div className='navbar-logo'>
          <img src={logo} alt="MedFlip" />
        </div>
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
      <div>
      <Link to="/checkout" className="navbar-link"><FaShoppingCart/> ({cart.length})</Link>
      </div>
    </nav>
  );
}

export default Navbar;
