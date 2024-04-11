import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./LoginForm.css"; // Import CSS file

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
      // Make a POST request to the login route on the backend
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password
      });

      // If login is successful, handle the response
      console.log(response.data); // For demonstration purposes, you can handle the response as needed
    } catch (error) {
      // If login fails, set the error state
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container"> {/* Apply container class */}
      <h2 className="login-heading">Login</h2> {/* Apply heading class */}
      {error && <div className="login-error">{error}</div>} {/* Apply error class */}
      <form onSubmit={handleSubmit} className="login-form"> {/* Apply form class */}
        <div>
          <label className="login-label">Username:</label> {/* Apply label class */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input" 
          />
        </div>
        <div>
          <label className="login-label">Password:</label> {/* Apply label class */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input" 
          />
        </div>
        <button type="submit" disabled={loading} className="login-button"> {/* Apply button class */}
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className='register-text'>Register for a new User? <Link to="/auth/register" className="login-link">Register here</Link> </p> {/* Apply link class */}
    </div>
  );
}

export default LoginForm;
