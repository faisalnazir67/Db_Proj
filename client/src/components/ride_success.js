import React , { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/signupSuccessful.css'; // Ensure to import your CSS file
import ReactModal from 'react-modal';

const RideSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const rideData = location.state && location.state.rideData;
  const [showRatingModal, setShowRatingModal] = useState(false);
  
  useEffect(() => {
    ReactModal.setAppElement('#root'); // Set the root element as the app element
  }, [])
  
  console.log(rideData)

  
  const handleEndRideAndRateDriver = () => {
    // Handle the combined action when the button is clicked
    // For now, it's navigating to the rate-driver page
    setShowRatingModal(true);
    
  };
  const handleCloseModal = () => {
    setShowRatingModal(false);
  };

  const handleRatingSubmit = async (stars) => {
    setShowRatingModal(false);
    
    // Log the selected star value
    console.log('Selected rating:', stars);
    
    try {
      // Send a POST request to the backend API with the selected rating
      const response = await fetch('http://localhost:5000/api/addrating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: stars ,rideData: rideData }),
      });
  
      if (response.ok) {
        // Handle successful response from the backend
        console.log('Rating submitted successfully!');
        navigate('/client/login');
      } else {
        // Handle errors from the backend
        console.error('Failed to submit rating:', response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div className="signup-successful-page">
      <p>Ride ID: {rideData.ride_id || rideData?.ride?.ride_id}</p>
      <p>Driver ID: {rideData.driver_id || rideData?.ride?.driver_id}</p>
      <p>User Name: {rideData.user_name || rideData?.ride?.user_name}</p>
      <p>Start Location: {rideData.start_location || rideData?.ride?.start_location}</p>
      <p>End Location: {rideData.end_location || rideData?.ride?.end_location}</p>
      <p>Fare: {rideData.fare || rideData?.ride?.fare}</p>
      <ReactModal
        isOpen={showRatingModal}
        onRequestClose={handleCloseModal}
        contentLabel="Rate the Driver"
        className="custom-modal"
      >
        <h2>Rate the Driver</h2>
        <p>Select a rating:</p>
        {/* Example: five stars */}
        <div className="stars">
          {[...Array(5)].map((_, index) => (
            <span key={index} onClick={() => handleRatingSubmit(index + 1)}>★</span>
          ))}
        </div>
        <button onClick={handleCloseModal}>Close</button>
      </ReactModal>
      <div className="action-buttons">
        <button onClick={handleEndRideAndRateDriver}>End Ride & Rate Driver</button>
      </div>
    </div>
  );
};

export default RideSuccess;
