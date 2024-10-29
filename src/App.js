import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage'; // Import the HomePage component
import Services from './Services';  // Import Services component
import AboutUs from './AboutUs';
import LoginPage from './LoginPage';
import CreateAccount from './CreateAccount';
import ScheduleWash from './ScheduleWash';
import Confirmation from './Confirmation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<Services />} />  {/* New route for Services */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<CreateAccount/>}/>
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/schedule-wash" element={<ScheduleWash />} />
      </Routes>
    </Router>
  );
}

export default App;