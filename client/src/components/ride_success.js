import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/signupSuccessful.css'; // Ensure to import your CSS file

const RideSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleEndRideAndRateDriver = () => {
    // Handle the combined action when the button is clicked
    // For now, it's navigating to the rate-driver page
    navigate('/rate-driver');
  };

  return (
    <div className="signup-successful-page">
      <h2>Ride Booked and In Progress</h2>
      {/* Assuming the ride_id and driver_id are passed through location state */}
      <p>Ride ID: {location.state && location.state.ride_id}</p>
      <p>Driver ID: {location.state && location.state.driver_id}</p>
      <div className="action-buttons">
        <button onClick={handleEndRideAndRateDriver}>End Ride & Rate Driver</button>
      </div>
    </div>
  );
};

export default RideSuccess;
