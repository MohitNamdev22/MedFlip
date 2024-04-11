import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const grandTotal = queryParams.get('total');

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentType, setPaymentType] = useState('');

  // Function to handle payment processing
  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      // Set payment status to success
      // Here you can implement actual payment processing logic
      alert('Payment successful!');
      // Redirect to home page after successful payment
      navigate('/');
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h1 className="payment-heading">Payment</h1>
      <div className="payment-details">
        {/* User details form */}
        <h2>Enter Your Details:</h2>
        <label className="payment-label">
          Name:
          <input type="text" className="payment-input" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="payment-label">
          Address:
          <input type="text" className="payment-input" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label className="payment-label">
          Phone Number:
          <input type="text" className="payment-input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <label className="payment-label">
          Pincode:
          <input type="text" className="payment-input" value={pincode} onChange={(e) => setPincode(e.target.value)} />
        </label>
      </div>
      <div className="payment-details">
        {/* Display grand total */}
        <h2>Grand Total:</h2>
        <p className="payment-total">₹{grandTotal}</p>
      </div>
      <div className="payment-details">
        {/* Payment type selection */}
        <h2>Select Payment Type:</h2>
        <label className="payment-label">
          <input type="radio" name="paymentType" value="Credit Card" onChange={() => setPaymentType('Credit Card')} />
          Credit Card
        </label>
        <label className="payment-label">
          <input type="radio" name="paymentType" value="Debit Card" onChange={() => setPaymentType('Debit Card')} />
          Debit Card
        </label>
        <label className="payment-label">
          <input type="radio" name="paymentType" value="Net Banking" onChange={() => setPaymentType('Net Banking')} />
          Net Banking
        </label>
      </div>
      <button className="payment-button" onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Payment;
