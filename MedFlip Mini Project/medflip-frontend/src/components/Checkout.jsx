import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access location state

function Checkout() {
  const location = useLocation(); // Get the location object
  const cart = location.state && location.state.cart; // Check if location state exists before accessing cart

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <h2>Selected Products:</h2>
        <ul>
          {cart && cart.map((item, index) => (
            <li key={index}>
              <p>Name: {item.name}</p>
              <p>Expiration Date: {item.expirationDate}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.price}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* Add checkout form or further checkout steps here */}
    </div>
  );
}

export default Checkout;
