import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { Navigate, Link } from 'react-router-dom';
import './LoginForm.css'
import './AdminDashboard.css'

function AdminDashboard() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [newMedication, setNewMedication] = useState({ name: '', expirationDate: '', quantity: 0 });

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://backend-medflip.onrender.com/auth/login', { username, password });
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid username or password.');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchMedications();
    }
  }, [isLoggedIn]);

  const fetchMedications = async () => {
    try {
      const response = await axios.get('https://backend-medflip.onrender.com/admin/medications');
      setMedications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching medications:', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleAddMedication = async () => {
    try {
      const name = prompt('Enter medication name:');
      const expirationDate = prompt('Enter expiration date (YYYY-MM-DD):');
      const quantity = parseFloat(prompt('Enter the quantity:'));

      if (!name || !expirationDate || isNaN(quantity)) {
        throw new Error('Please provide valid medication details.');
      }

      const newMedication = { name, expirationDate, quantity };
      const response = await axios.post('https://backend-medflip.onrender.com/admin/medications', newMedication);

      setMedications([...medications, response.data]);
      await fetchMedications();
    } catch (error) {
      console.error('Error adding medication:', error);
      setError(error);
    }
  };

  const handleEditMedication = async (id) => {
    try {
      const name = prompt('Enter updated medication name:');
      const expirationDate = prompt('Enter updated expiration date (YYYY-MM-DD):');
      const quantity = parseFloat(prompt('Enter updated quantity:'));

      if (!name || !expirationDate || isNaN(quantity)) {
        throw new Error('Please provide valid medication details.');
      }

      const updatedMedication = { name, expirationDate, quantity };
      await axios.put(`https://backend-medflip.onrender.com/admin/medications/${id}`, updatedMedication);

      const updatedMedications = medications.map(medication =>
        medication.id === id ? { ...medication, ...updatedMedication } : medication
      );
      setMedications(updatedMedications);
    } catch (error) {
      console.error(`Error editing medication with ID ${id}:`, error);
      setError(error);
    }
  };

  const handleDeleteMedication = async (id) => {
    try {
      await axios.delete(`https://backend-medflip.onrender.com/admin/medications/${id}`);
      setMedications(medications.filter(med => med.id !== id));
    } catch (error) {
      console.error(`Error deleting medication with ID ${id}:`, error);
      setError(error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className='login-container'>
        <h1 className='login-heading'>Login</h1>
        <div className='register-text'>{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}</div>
        <div><label className="login-label">Username:</label><input className="login-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
        <div><label className="login-label">Password:</label><input className="login-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        <button onClick={handleLogin} className='login-button'>Login</button>
        <p className='register-text'>Don't have an account? <Link to="/auth/register" className='login-link'>Register here</Link></p>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='admin-heading'>Admin Dashboard</h1>
      <div className="admin-container">
      <div>
        <h2 className='admin-heading'>Add Medication</h2>
        <button className='admin-button' onClick={handleAddMedication}>Add Medication</button>
      </div>
  <h2 className="admin-heading">Manage Medications</h2>
  <table className="admin-table">
    <thead>
      <tr>
        <th className="admin-table-header">ID</th>
        <th className="admin-table-header">Name</th>
        <th className="admin-table-header">Expiration Date</th>
        <th className="admin-table-header">Quantity</th>
        <th className="admin-table-header">Actions</th>
      </tr>
    </thead>
    <tbody>
      {medications.map(medication => (
        <tr key={medication.id}>
          <td className="admin-table-data">{medication.id}</td>
          <td className="admin-table-data">{medication.name}</td>
          <td className="admin-table-data">{medication.expirationDate}</td>
          <td className="admin-table-data">{medication.quantity}</td>
          <td className="admin-table-data">
            <button className="admin-button" onClick={() => handleEditMedication(medication.id)}>Edit</button>
            <button className="admin-button" onClick={() => handleDeleteMedication(medication.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}

export default AdminDashboard;
