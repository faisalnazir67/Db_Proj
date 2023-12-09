import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signupSuccessful.css';

const DriverSignupSuccessful = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Redirect to driver login page upon clicking the button
    navigate('/driver/login');
  };

  return (
    <div className="signup-successful-page">
      <h2>Driver Signup Successful!</h2>
      <p>Your account has been successfully created.</p>
      <button onClick={handleLoginClick}>Go to Driver Login Page</button>
    </div>
  );
};

export default DriverSignupSuccessful;
