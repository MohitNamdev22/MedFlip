import React from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();

  const cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);
  const shippingAmount = 50;
  const gst = totalAmount * 0.18;
  const grandTotal = totalAmount + shippingAmount + gst;

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.reload();
  };

  const clearCart = () => {
    sessionStorage.removeItem('cart');
    window.location.reload();
  };

  const proceedToPayment = () => {
    // Navigate to the payment page with the grand total as query parameter
    navigate(`/payment?total=${grandTotal}`);
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
              <button onClick={() => removeFromCart(index)}>Remove</button>
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
      <button onClick={clearCart}>Clear Cart</button>
      <button onClick={proceedToPayment}>Proceed to Payment</button>
    </div>
  );
}

export default Checkout;
