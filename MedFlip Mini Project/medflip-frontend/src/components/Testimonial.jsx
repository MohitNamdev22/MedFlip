import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Testimonial.css';

function Testimonial() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/testimonials'); // Adjust the URL accordingly
      setTestimonials(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setError('Failed to fetch testimonials. Please try again later.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/admin/testimonials', { name, message }); // Adjust the URL accordingly
      setSubmitted(true);
      setName('');
      setMessage('');
      fetchTestimonials(); // Refresh testimonials after submission
    } catch (error) {
      setError('Failed to submit testimonial. Please try again later.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="testimonial-container">
      <h2>Submit Your Testimonial</h2>
      {submitted ? (
        <p>Thank you for your testimonial!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
      {error && <p className="error-message">{error}</p>}
      <div className="testimonials-list">
        <h2>Testimonials</h2>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial">
            <p><strong>{testimonial.name}</strong>: {testimonial.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonial;
