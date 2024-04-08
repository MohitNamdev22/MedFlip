import React from 'react';

function Checkout() {
  // Retrieve cart items from sessionStorage
  const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
  
  // Calculate total amount of all medicine prices
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
  
  // Calculate shipping amount (assuming it's fixed at Rs. 50)
  const shippingAmount = 50;
  
  // Calculate GST (18% of total amount)
  const gst = totalAmount * 0.18;
  
  // Calculate grand total (total amount + shipping amount + GST)
  const grandTotal = totalAmount + shippingAmount + gst;
  
  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1); // Remove item at the specified index
    sessionStorage.setItem('cart', JSON.stringify(updatedCart)); // Update sessionStorage with the modified cart
    window.location.reload(); // Refresh the page to reflect the changes
  };

  // Function to clear the entire cart
  const clearCart = () => {
    sessionStorage.removeItem('cart'); // Remove cart data from sessionStorage
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
      <div>
        <h2>Payment Details:</h2>
        <p>Total Amount: {totalAmount}</p>
        <p>Shipping Amount: {shippingAmount}</p>
        <p>GST: {gst}</p>
        <p>Grand Total: {grandTotal}</p>
      </div>
      <button onClick={clearCart}>Clear Cart</button> {/* Button to clear the entire cart */}
      <button>Proceed to Payment</button> {/* Button to proceed with payment */}
      {/* Add checkout form or further checkout steps here */}
    </div>
  );
}

export default Checkout;
