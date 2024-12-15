import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import './Confirmation.css'; // Import the CSS file

const ConfirmationPage = () => {
  const navigate = useNavigate(); // Use useNavigate for redirection
          
  return (
    <div className="confirmation-container">
      <h2>Thank You!</h2>
      <p>
        Thank you for availing our services! Our team will reach out to you with further information regarding the confirmation of your schedule.
      </p>
      <button onClick={() => navigate('/home')}>Home Page</button>
      {/* <button onClick={() => navigate('/')}>Log Out</button> Redirect to the homepage */}
    </div>
  );
};

export default ConfirmationPage;
