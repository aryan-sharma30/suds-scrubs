import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    isVeteranOrTeacher: null,
  });

  const [passwordError, setPasswordError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/;
      if (value.length < 5 || !specialCharacterPattern.test(value)) {
        setPasswordError('Password must be at least 5 characters and include a special character.');
      } else {
        setPasswordError('');
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setPasswordMatchError('Passwords do not match.');
      } else {
        setPasswordMatchError('');
      }
    }
  };

  const isFormValid = () => {
    const { firstName, lastName, phone, email, password, confirmPassword, isVeteranOrTeacher } = formData;
    return firstName && lastName && phone && email && password === confirmPassword && !passwordError && isVeteranOrTeacher !== null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setConfirmationMessage('Please fill in all details correctly.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setConfirmationMessage('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login'); // Redirect to the login page after a delay
        }, 3000); // Redirect after 3 seconds
      } else {
        setConfirmationMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setConfirmationMessage('User Already exists');
    }
  };

  return (
    <div className="create-account-page">
      <div className="create-account-container">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {passwordMatchError && <p className="error">{passwordMatchError}</p>}
          </div>
          <div className="input-group">
            <label>Are you a veteran or a teacher?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="isVeteranOrTeacher"
                  value="yes"
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="isVeteranOrTeacher"
                  value="no"
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>
          <button type="submit" className="create-account-button" disabled={!isFormValid()}>
            Create Account
          </button>
        </form>
        {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
      </div>
    </div>
  );
};

export default CreateAccount;
