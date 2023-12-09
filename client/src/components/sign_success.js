import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signupSuccessful.css';

const SignupSuccessful = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Redirect to login page upon clicking the button
    navigate('/client/login');
  };

  return (
    <div className="signup-successful-page">
      <h2>Signup Successful!</h2>
      <p>Your account has been successfully created.</p>
      <button onClick={handleLoginClick}>Go to Login Page</button>
    </div>
  );
};

export default SignupSuccessful;