import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from './CartContext'; 
import './MedicationList.css'; 

function MedicationList() {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  const addToCartSession = (medication)=>{
    const existingCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, medication];
    sessionStorage.setItem('cart',JSON.stringify(updatedCart));
  };
  
  useEffect(() => {
    fetchMedications();
  }, []);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="medication-list">
      <h1 className="medication-heading">MediFlip Store</h1>
      <div className="medication-cards">
        {medications.map(medication => (
          <div className="medication-card" key={medication.id}>
            <h2>{medication.name}</h2>
            <p>Expiration Date: {medication.expirationDate}</p>
            <p>Quantity: {medication.quantity}</p>
            <p>Price: {medication.price}</p>
            <button className="add-to-cart-button" onClick={() => {addToCart(medication); addToCartSession(medication);}}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MedicationList;
