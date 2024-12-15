import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ScheduleWash.css';
import Checkout from './Checkout';

const ScheduleWash = () => {
  const [price, setPrice] = useState(0); // Initialize price to 0
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [carDetails, setCarDetails] = useState({
    address: '',
    carCompany: '',
    seatMat: '',
    carType: '',
    packageType: '',
    slot: '',
  });

  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const navigate = useNavigate(); // Use navigate for redirection

  // Set min and max date when component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
    const today = new Date();
    const oneMonthLater = new Date(today);
    oneMonthLater.setMonth(today.getMonth() + 1);

    const formatDate = (date) => date.toISOString().slice(0, 16);
    setMinDate(formatDate(today));
    setMaxDate(formatDate(oneMonthLater));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDetails((prevDetails) => {
      const newDetails = { ...prevDetails, [name]: value };
      // Dynamically set price based on the package selected
      if (name === "packageType") {
        switch (value) {
          case "Exterior":
            setPrice(80); // Set price for Exterior package
            break;
          case "Interior":
            setPrice(90); // Set price for Interior package
            break;
          case "Exterior+Interior":
            setPrice(130); // Set price for both packages
            break;
          default:
            setPrice(0); // Default price if no package is selected
        }
      }
      return newDetails;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Proceed to checkout with the selected price
    try {
      const response = await fetch('https://suds-scrubs-production.up.railway.app/api/users/schedule-wash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, ...carDetails }),
      });

      if (response.ok) {
        const result = await response.json();
        navigate('/checkout', { state: { price } }); // Pass dynamic price to the checkout page
      } else {
        console.error('Failed to schedule wash');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onLogOutClick = () => {
    localStorage.clear();
  };

  return (
    <div>
      <header className="header">
        <div className="logo">Suds & Scrubs</div>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/schedule-wash">Schedule a Wash</a></li>
            <li><Link to="/wash-history">Wash History</Link></li>
            <li><Link to="/feedback">Ratings/Feedback</Link></li>
            <li><Link to="/" onClick={onLogOutClick}>Logout</Link></li>
          </ul>
        </nav>
      </header>
      <div className="schedule-wash">
        <div className="form-container">
          <h2>Schedule Your Wash</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                placeholder="Enter your address"
                value={carDetails.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="carCompany">Car Company & Model</label>
              <input
                type="text"
                id="carCompany"
                name="carCompany"
                placeholder="Enter your car's company and model"
                value={carDetails.carCompany}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="seatMat">Car Seat Material</label>
              <select
                id="seatMat"
                name="seatMat"
                value={carDetails.seatMat}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Seat Material</option>
                <option value="Leather">Leather</option>
                <option value="Vinyl">Vinyl</option>
                <option value="FauxLeather">Faux Leather</option>
                <option value="Polyester">Polyester</option>
                <option value="Alcantra">Alcantra</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="carType">Car Type</label>
              <select
                id="carType"
                name="carType"
                value={carDetails.carType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Car Type</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Coupe">Coupe</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="packageType">Choose Package</label>
              <select
                id="packageType"
                name="packageType"
                value={carDetails.packageType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Package</option>
                <option value="Exterior">Exterior Detailing - $80</option>
                <option value="Interior">Interior Detailing - $90</option>
                <option value="Exterior+Interior">Exterior + Interior - $130</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="slot">Pick a Time Slot</label>
              <input
                type="datetime-local"
                id="slot"
                name="slot"
                value={carDetails.slot}
                onChange={handleChange}
                min={minDate}
                max={maxDate}
                required
              />
            </div>
            <button type="submit" className="schedule-button">Schedule Wash</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleWash;
