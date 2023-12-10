// Welcome.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/welcome.css'; // Import the CSS file

const Welcome = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    // Redirect based on the selected option
    console.log(`/${option.toLowerCase()}/login`);
    navigate(`/${option.toLowerCase()}/login`);
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-header">Welcome to the Ride Sharing App</h1>
      <p className="welcome-text">Select an option:</p>
      <button onClick={() => handleOptionSelect('Client')} className="welcome-button">I am a Client</button>
      <button onClick={() => handleOptionSelect('Admin')} className="welcome-button">I am an Admin</button>
      <button onClick={() => handleOptionSelect('Driver')} className="welcome-button">I am a Driver</button>
    </div>
  );
};

export default Welcome;
