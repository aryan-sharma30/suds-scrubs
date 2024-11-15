import React, { useEffect, useState } from 'react';
import './HomePage.css';
import Card from './Card'; 
import { Link, useNavigate } from 'react-router-dom';
import blackBg from './images/CoolBlackBackground.png'

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [washes, setWashes] = useState([]);
  const [canSchedule, setCanSchedule] = useState(true);

  // Assuming you have a way to check if the user is logged in
  const isLoggedIn = !!localStorage.getItem('userId'); // Replace this with actual login check logic (from state, context, etc.)

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchScheduledWashes(userId);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleScheduleWashClick = () => {
    if (isLoggedIn) {
      navigate('/schedule-wash'); // If logged in, go to the schedule wash page
    } else {
      navigate('/login'); // If not logged in, go to the login page
    }
  };

  const fetchScheduledWashes = async (userId) => {
    try {
      const response = await fetch(`https://suds-scrubs-production.up.railway.app/api/users/scheduled-washes/${userId}`);
      const data = await response.json();
      setWashes(data.washes || []);
      setCanSchedule((data.washes || []).length < 3); // Allow scheduling if less than 3 washes
    } catch (error) {
      console.error('Error fetching scheduled washes:', error);
    }
  };

  const handleDeleteWash = async (orderId) => {
    try {
        const response = await fetch(`https://suds-scrubs-production.up.railway.app/api/users/scheduled-wash/${orderId}`, {
            method: 'DELETE',
        });
        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            // Update state to remove the deleted wash
            setWashes((prevWashes) => prevWashes.filter((wash) => wash.order_id !== orderId));
        } else {
            alert(result.error || 'Failed to delete wash');
        }
    } catch (error) {
        console.error('Error deleting wash:', error);
        alert('Error deleting wash');
    }
};


const onLogOutClick = () => {
  localStorage.clear();
}

  return (
    <div className="home-page">
      {/* Header */}
      <header className="header">
        <div className="logo">Suds & Scrubs</div>
        <nav>
          <ul> 
            <li><a href="/schedule-wash">Schedule a Wash</a></li>
            <li><Link to="/wash-history">Wash History</Link></li>
            <li><Link to="/feedback">Ratings/Feedback</Link></li>
            <li><Link to="/" onClick={onLogOutClick}>Logout</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
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
      <div>
        <div className="hero-content-box">
          <h1>Hello, {username}</h1>
          {washes.length > 0 ? (
            <div>
            <h2>Here are your scheduled washes:</h2>
            <div className="cards-container">
              {washes.map((wash) => (
                <Card key={wash.order_id} 
                  orderID = {wash.order_id} 
                  packageType={wash.packageType} 
                  carCompanyAndName={wash.carCompanyAndName} 
                  address={wash.address} 
                  onDelete={handleDeleteWash}
                  //onModify={handleModifyWash}
                />
              ))}
            </div>
            <p>You can schedule up to {3 - washes.length} more washes.</p>
          </div>
          ) : (
            <p>Looks like you don't have any scheduled washes with us yet.</p>
          )}
           {canSchedule && (
            <button className="cta-button" onClick={() => navigate('/schedule-wash')}>Schedule a Wash</button>
          )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
