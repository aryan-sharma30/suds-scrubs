// src/Testimony.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Testimony.css';  // Update styles in Services.css

const Testimony = () => {
  return (
    <div className='services-container'>
        <header>
            <Link to="/" className="logo">Suds & Scrubs</Link>
       </header>
       <h1>Testimonials</h1>
        <div className='testimony-container'>
            <div class="container">
                <div class="wrapper">
                    <div class="banner-image-1"> </div>
                    <p>Fantastic job done by Nishank and company. They were very professional. Good luck to them. - Natasha</p>
                </div>
            </div>
            <div class="container">
                <div class="wrapper">
                <div class="banner-image-2"> </div>
                <p>Great job boys! My car is brand spanking you. Tomorrow I’m putting them to work again on the deck. They did such a nice job today and such a pleasure to work with, I love how they are both so eager to learn the art of business ownership and entrepreneurship, trying to figure out how to expand their business! - Yogesh</p>
                </div>
            </div>
            <div class="container">
                <div class="wrapper">
                    <div class="banner-image-3"> </div>
                    <p>Incredibly impressed with these guys! My car looks practically brand new. They're back at it tomorrow, tackling a few more tasks around the house. It's refreshing to work with such motivated young professionals who take pride in every detail. - June</p>
                    </div>
            </div>
        </div>
    </div>
  );
};

export default Testimony;
