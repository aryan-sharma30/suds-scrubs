// src/Services.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';  // Update styles in Services.css

const Services = () => {
  return (
    <div className="services-container">
      <header>
        <Link to="/" className="logo">Suds & Scrubs</Link>
      </header>

      <h1>Our Services</h1>
      
      <div className="services-grid">
        <div className="service-item">
          <h2>Car Exterior Detailing</h2>
          <ul>
            <li>Shiny Wax Finish</li>
            <li>No Water Streaks</li>
            <li>Tire Cleaning Included</li>
          </ul>
          <p><strong>Price: $80</strong> <em>($10 Extra for SUVs)</em></p>
        </div>

        <div className="service-item">
          <h2>Car Interior Detailing</h2>
          <ul>
            <li>Removes Hairs and Stains</li>
            <li>Cleans Carpets, Plastics & More</li>
          </ul>
          <p><strong>Price: $90</strong> <em>($10 Extra for SUVs)</em></p>
        </div>

        <div className="service-item">
          <h2>Car Exterior + Interior Detailing Package</h2>
          <ul>
            <li>Complete Car Makeover</li>
          </ul>
          <p><strong>Price: $130</strong> <em>($15 Extra for SUVs)</em></p>
        </div>

        <div className="service-item">
          <h2>Pressure Washing</h2>
          <ul>
            <li>Patio & deck cleaning</li>
            <li>Get a Quote</li>
          </ul>
        </div>

        <div className="service-item">
          <h2>Trash Can and Chair Cleaning</h2>
          <ul>
            <li>Cleans Trash Cans and Chairs</li>
          </ul>
          <p><strong>Price: $5 per Chair/Trash can</strong></p>
        </div>
      </div>

      <div className="contact-info">
        <h3>Contact Us:</h3>
        <p>Text us at - 267-776-7788</p>
      </div>
    </div>
  );
};

export default Services;
