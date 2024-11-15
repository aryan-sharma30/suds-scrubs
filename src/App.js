import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage'; // Import the HomePage component
import Services from './Services';  // Import Services component
import AboutUs from './AboutUs';
import LoginPage from './LoginPage';
import CreateAccount from './CreateAccount';
import ScheduleWash from './ScheduleWash';
import Confirmation from './Confirmation';
import Testimony from './Testimony';
import OTPInput from './OTPInput';
import ChangePassword from './ChangePassword';
import Profile from './Profile';
import Feedback from './Feedback';
import WashHistory from './WashHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />  {/* New route for Services */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<CreateAccount/>}/>
        <Route path="/forgot-password" element={<OTPInput/>}/>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/schedule-wash" element={<ScheduleWash />} />
        <Route path="/testimony" element={<Testimony />} />
        <Route path="/home" element={<Profile />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/wash-history" element={<WashHistory />} />
      </Routes>
    </Router>
  );
}

export default App;