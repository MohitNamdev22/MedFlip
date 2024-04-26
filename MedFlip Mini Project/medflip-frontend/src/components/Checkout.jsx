import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css'

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
    navigate(`/payment?total=${grandTotal}`);
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-heading">Checkout</h1>
      <div>
        <h2>Selected Products:</h2>
        <ul className="checkout-list">
          {cartItems.map((item, index) => (
            <li key={index} className="checkout-item">
              <p><b>{item.name}</b></p>
              <p>Expiration Date : {item.expirationDate}</p>
              <p className='price'>₹{item.price}</p>
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="payment-details">
  <h2>Payment Details:</h2>
  <div className="payment-detail">
    <p>Total Amount:</p>
    <p>₹{totalAmount}</p>
  </div>
  <div className="payment-detail">
    <p>Shipping Amount:</p>
    <p>₹{shippingAmount}</p>
  </div>
  <div className="payment-detail">
    <p>GST:</p>
    <p>₹{gst}</p>
  </div>
  <div className="payment-detail">
    <p>Grand Total:</p>
    <p>₹{grandTotal}</p>
  </div>
</div>

      <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
      <button className="proceed-button" onClick={proceedToPayment}>Proceed to Payment</button>
    </div>
  );
}

export default Checkout;
