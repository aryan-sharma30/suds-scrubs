import React, { useState } from 'react';
import './HomePage.css';
import { Link, useNavigate } from 'react-router-dom';
import blackBg from './images/CoolBlackBackground.png';

const Feedback = () => {
  const [selectedRating, setSelectedRating] = useState(''); // Initial rating
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [comments, setComments] = useState('');
  
  const navigate = useNavigate();


  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handleSendReview = async () => {
    if (!selectedRating) return alert('Please select a rating.');

    

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User not logged in. Please log in to submit feedback.');
      return;
    }

    const ratingValue = selectedRating === 'Happy' ? 3 : selectedRating === 'Neutral' ? 2 : 1;

    try {
      const response = await fetch('https://localhost:5000/api/users/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, rating: ratingValue, comments }),
      });

      if (response.ok) {
        setFeedbackSubmitted(true);
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }

  };

  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">Suds & Scrubs</div>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/schedule-wash">Schedule a Wash</a></li>
            <li><Link to="/wash-history">Wash History</Link></li>
            <li><Link to="/feedback">Ratings/Feedback</Link></li>
            <li><Link to="/login">Logout</Link></li>
          </ul>
        </nav>
      </header>

      <section
        className="hero"
        style={{
          backgroundImage: `url(${blackBg})`,
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
          {!feedbackSubmitted ? (
            <div id="feedback" className="feedback-container" style={{ color: '#000' }}>
              <strong>How satisfied are you with our <br/> service?</strong>
              <div className="ratings-container">
                <div className={`rating ${selectedRating === 'Unsatisfied' ? 'active' : ''}`} onClick={() => handleRatingClick('Unsatisfied')}>
                  <img src="https://img.icons8.com/external-neu-royyan-wijaya/64/000000/external-emoji-neumojis-smiley-neu-royyan-wijaya-17.png" alt="Unsatisfied" />
                  <small>Unsatisfied</small>
                </div>
                <div className={`rating ${selectedRating === 'Neutral' ? 'active' : ''}`} onClick={() => handleRatingClick('Neutral')}>
                  <img src="https://img.icons8.com/external-neu-royyan-wijaya/64/000000/external-emoji-neumojis-smiley-neu-royyan-wijaya-3.png" alt="Neutral" />
                  <small>Neutral</small>
                </div>
                <div className={`rating ${selectedRating === 'Happy' ? 'active' : ''}`} onClick={() => handleRatingClick('Happy')}>
                  <img src="https://img.icons8.com/external-neu-royyan-wijaya/64/000000/external-emoji-neumojis-smiley-neu-royyan-wijaya-30.png" alt="Happy" />
                  <small>Happy</small>
                </div>
              </div>
              <textarea
                className="feedback-textbox"
                placeholder="Please leave additional comments here..."
                value={comments} // Bind value to state
                onChange={handleCommentsChange} // Update state on change
            ></textarea>
              <button className="btn" onClick={handleSendReview}>Send Review</button>
            </div>
          ) : (
            <div className="feedback-container" style={{color:'black'}}>
              <i className="fas fa-heart"></i>
              <strong>Thank You!</strong>
              <br />
              <strong>Feedback: {selectedRating}</strong>
              <p style={{color:'black'}}>We'll use your feedback to improve our customer support.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Feedback;
