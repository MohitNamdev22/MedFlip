import React from 'react';
import { useLocation } from 'react-router-dom';

function Payment() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const grandTotal = queryParams.get('total');

  // Simulate payment processing
  const handlePayment = () => {
    // Mock payment processing
    setTimeout(() => {
      // Set payment status to success
      // Here you can implement actual payment processing logic
      alert('Payment successful!');
    }, 2000);
  };

  return (
    <div>
      <h1>Payment</h1>
      <div>
        <h2>Grand Total:</h2>
        <p>₹{grandTotal}</p>
      </div>
      <div>
        <h2>Enter Payment Details:</h2>
        {/* Payment form inputs */}
        <label>
          Card Number:
          <input type="text" />
        </label>
        <label>
          Expiry Date:
          <input type="text" />
        </label>
        <label>
          CVV:
          <input type="text" />
        </label>
      </div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Payment;
