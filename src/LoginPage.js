import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setLoginMessage('Login successful! Redirecting to schedule a wash...');
        setTimeout(() => {
          navigate('/schedule-wash');
        }, 2000);
      } else {
        setLoginMessage(`Error: ${data.error}`); // Fixed error message
      }
    } catch (error) {
      console.error('Login error:', error); // Log the error
      setLoginMessage('Login failed. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel" // Changed to "tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="\d{10,15}" // Keep the pattern for phone number validation
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'} {/* Conditional loading state */}
          </button>
        </form>
        {loginMessage && <p className="login-message">{loginMessage}</p>}
        <p className="create-account">
          Don't have an account? <a href="/signup">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
