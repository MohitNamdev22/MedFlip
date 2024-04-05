import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MedicationList() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/medications'); // Adjust the URL accordingly
      setMedications(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching medications:', error);
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Medication List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Expiration Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {medications.map(medication => (
            <tr key={medication.id}>
              <td>{medication.id}</td>
              <td>{medication.name}</td>
              <td>{medication.expirationDate}</td>
              <td>${medication.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicationList;
