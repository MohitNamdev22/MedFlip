import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./LoginForm.css";

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://backend-medflip.onrender.com/auth/login', {
        username,
        password
      });

      console.log(response.data);
    } catch (error) {

      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container"> 
      <h2 className="login-heading">Login</h2> 
      {error && <div className="login-error">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label className="login-label">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input" 
          />
        </div>
        <div>
          <label className="login-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input" 
          />
        </div>
        <button type="submit" disabled={loading} className="login-button">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className='register-text'>Register for a new User? <Link to="/auth/register" className="login-link">Register here</Link> </p>
    </div>
  );
}

export default LoginForm;
