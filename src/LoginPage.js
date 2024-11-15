import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [loginMessage, setLoginMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Email is required.');
    } else if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
    } else {
      setError(''); 
      try {
        const response = await fetch('https://suds-scrubs-production.up.railway.app/api/users/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
          alert(data.message);
          navigate('/verify-otp', { state: { email } }); // Navigate to OTP verification page
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch('https://suds-scrubs-production.up.railway.app/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
        setLoginMessage('Login successful! Redirecting to schedule a wash...');
        setTimeout(() => {
          navigate('/home');
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
            <label htmlFor="email">Email ID</label>
            <input
              type="email" // Changed to "tel"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
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

          <div className="forgot-password-container">
            <a onClick={handleForgotPassword} className="forgot-password">Forgot Password?</a>
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
