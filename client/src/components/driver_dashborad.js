import { useEffect , useState } from "react"
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/driverdashboard.css'; 

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [availability, setAvailability] = useState('');
  const [walletBalance, setWalletBalance] = useState(0); 
  const location = useLocation();
  const { state } = location;
  const [confirmationMessage, setConfirmationMessage] = useState('');

 
  const fetchWalletBalance = async (driverName) => {
  try {
    
    const response = await fetch('http://localhost:5000/api/driverwallet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ driverName }),
    });

    if (response.ok) {
      const data = await response.json();
      setWalletBalance(data.walletBalance);
    } else {
      console.error('Failed to fetch wallet balance');
    }
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
  }
};

  const handleAvailability = async (status) => {
    try {
      setAvailability(status);
      const response = await fetch('http://localhost:5000/api/setAvailability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ driverName: state.name, availability: status }),
      });

      if (response.ok) {
        setConfirmationMessage(`You are now ${status.toLowerCase()}`);
      } else {
        console.error('Failed to update availability');
      }
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  
  };

  const handleCloseMessage = () => {
    setConfirmationMessage('');
  };

  const handleEndRide = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/endRide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ driverName: state.name }), // Sending driver's name to the backend
      });
  
      if (response.ok) {
        // Perform actions if the ride has ended successfully
        handleAvailability('Available'); // Set availability to Available (1)
        setConfirmationMessage('Ride ended successfully');
      } else {
        console.error('Failed to end the ride');
      }
    } catch (error) {
      console.error('Error ending the ride:', error);
    }
  };

  useEffect(() => {
    if (state && state.name) {
      fetchWalletBalance(state.name);
    }
  }, [state]);
  return (
    <div className="driver-dashboard">
      <nav className="sidebar">
        <h2>Welcome {state ? state.name : 'Faisal'} - Wallet: {walletBalance.toFixed(2)} PKR </h2>
        <button className="sidebar-button" onClick={() => handleAvailability('Available')}>
          Available
        </button>
        <button className="sidebar-button" onClick={() => handleAvailability('Unavailable')}>
          Unavailable
        </button>
        <button className="sidebar-button" onClick={handleEndRide}>
          End Ride
        </button>
      </nav>
      <main>
        <div className="welcome-message">
          <h1>Welcome, {state ? state.name : 'Faisal'}!</h1>
        </div>
        {confirmationMessage && (
          <div className="confirmation-message">
            <p>{confirmationMessage}</p>
            <button onClick={handleCloseMessage}>Close</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DriverDashboard;
