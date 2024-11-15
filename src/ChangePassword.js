import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangePassword.css';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState('');
  const navigate = useNavigate();

 

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (password !== confirmPassword) {
        setError('Passwords do not match. Please try again.');
        return;
      }
  
      setLoading(true); 

      try {
        // Mock API call success (You can replace this with the actual backend API)
        setTimeout(() => {
          // On successful reset, redirect to the login page
          setLoading(false);
          navigate('/login');
        }, 2000); // Simulate a delay for the API call
      } catch (error) {
        setLoading(false);
        setError('An error occurred while resetting your password. Please try again.');
      }
    //setLoading(true); // Start loading

    // try {
    //   const response = await fetch('https://suds-scrubs-production.up.railway.app/api/users/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   const data = await response.json();
    //   if (response.ok) {
    //     setLoginMessage('Login successful! Redirecting to schedule a wash...');
    //     setTimeout(() => {
    //       navigate('/schedule-wash');
    //     }, 2000);
    //   } else {
    //     setLoginMessage(`Error: ${data.error}`); // Fixed error message
    //   }
    // } catch (error) {
    //   console.error('Login error:', error); // Log the error
    //   setLoginMessage('Login failed. Please try again.');
    // } finally {
    //   setLoading(false); // Stop loading
    // }

  };

  return (
    <div className="change-password">
      <div className="change-password-container">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>} {/* Display error message */}
          <button type="submit" className="reset-button" disabled={loading}>
            {loading ? 'Resetting Password...' : 'Reset Password'} {/* Conditional loading state */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
