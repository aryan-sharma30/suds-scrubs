// src/AboutUs.js

import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';  // Create a separate CSS file for About Us

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header>
        <Link to="/" className="logo">Suds & Scrubs</Link>
      </header>

      <div className="about-card">
        <p>Two boys eager to learn the art of business ownership and entrepreneurship.</p>
      </div>
    </div>
  );
};

export default AboutUs;
