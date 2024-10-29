import React from 'react';
import './HomePage.css';
import { Link, useNavigate } from 'react-router-dom';
import carWashBg from './images/car-wash-bg.jpeg'; 

const HomePage = () => {
  const navigate = useNavigate();

  // Assuming you have a way to check if the user is logged in
  const isLoggedIn = false; // Replace this with actual login check logic (from state, context, etc.)

  const handleScheduleWashClick = () => {
    if (isLoggedIn) {
      navigate('/schedule-wash'); // If logged in, go to the schedule wash page
    } else {
      navigate('/login'); // If not logged in, go to the login page
    }
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="logo">Suds & Scrubs</div>
        <nav>
          <ul>
            <li><Link to="/services">Services</Link></li> 
            <li><a href="/login">Schedule a Wash</a></li>
            <li><Link to="/login">Login / Sign Up</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${carWashBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
        }}
      >
        <div className="hero-content-box">
          <h1>Get Your Car Cleaned Anytime, Anywhere</h1>
          <p>Your car deserves the best wash</p>
          <div className="cta-buttons">
            <button className="cta-button" onClick={handleScheduleWashClick}>Schedule a Wash</button>
            <button className="cta-button secondary">Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
