import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './RegistrationForm.css'

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('https://backend-medflip.onrender.com/auth/register', {
        username,
        password
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className='registration-container'>
      <h2 className='registration-heading'>Registration Form</h2>
      <form className='registration-form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className='registration-label'>Username:</label>
          <input
            type="text"
            id="username"
            name='username'
            value={username}
            className='registration-input'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className='registration-label' htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            className='registration-input'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className='registration-button'>Register</button>
      </form>
      {message && <p className='registration-message'>{message}</p>}
      <p>Already have an account? <Link to="/auth/login" className='registration-link'>Login here</Link></p>
    </div>
  );
}

export default RegistrationForm;
