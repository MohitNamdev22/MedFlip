import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li>
          <Link to="/admin/medication" className="navbar-link">Admin Dashboard</Link>
        </li>
        <li>
          <Link to="/auth/login" className="navbar-link">Login</Link>
        </li>
        <li>
          <Link to="/auth/register" className="navbar-link">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
