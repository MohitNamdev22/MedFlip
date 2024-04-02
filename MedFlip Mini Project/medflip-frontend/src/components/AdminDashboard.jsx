import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMedications = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/medications');
      setMedications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching medications:', error);
      setError(error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMedications();
  }, []);

  const handleAddMedication = async () => {
    try {
      const name = prompt('Enter medication name:');
      const expirationDate = prompt('Enter expiration date (YYYY-MM-DD):');
      const price = parseFloat(prompt('Enter medication price:'));

      if (!name || !expirationDate || isNaN(price)) {
        throw new Error('Please provide valid medication details.');
      }

      const newMedication = { name, expirationDate, price };
      const response = await axios.post('http://localhost:3000/admin/medications', newMedication);

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
      const price = parseFloat(prompt('Enter updated medication price:'));

      if (!name || !expirationDate || isNaN(price)) {
        throw new Error('Please provide valid medication details.');
      }

      const updatedMedication = { name, expirationDate, price };
      await axios.put(`http://localhost:3000/admin/medications/${id}`, updatedMedication);

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
      await axios.delete(`http://localhost:3000/admin/medications/${id}`);
      const updatedMedications = medications.filter(medication => medication.id !== id);
      setMedications(updatedMedications);
    } catch (error) {
      console.error(`Error deleting medication with ID ${id}:`, error);
      setError(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Manage Medications</h2>
        <button onClick={handleAddMedication}>Add Medication</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Expiration Date</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medications.map(medication => (
              <tr key={medication.id}>
                <td>{medication.id}</td>
                <td>{medication.name}</td>
                <td>{medication.expirationDate}</td>
                <td>${medication.price}</td>
                <td>
                  <button onClick={() => handleEditMedication(medication.id)}>Edit</button>
                  <button onClick={() => handleDeleteMedication(medication.id)}>Delete</button>
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
