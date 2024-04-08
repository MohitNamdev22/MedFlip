import React from 'react';

function Checkout() {
  // Retrieve cart items from sessionStorage
  const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1); // Remove item at the specified index
    sessionStorage.setItem('cart', JSON.stringify(updatedCart)); // Update sessionStorage with the modified cart
    window.location.reload(); // Refresh the page to reflect the changes
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <h2>Selected Products:</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <p>Name: {item.name}</p>
              <p>Expiration Date: {item.expirationDate}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.price}</p>
              <button onClick={() => removeFromCart(index)}>Remove</button> {/* Button to remove the item */}
            </li>
          ))}
        </ul>
      </div>
      {/* Add checkout form or further checkout steps here */}
    </div>
  );
}

export default Checkout;
