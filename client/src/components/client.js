import { useEffect , useState } from "react"
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/clientsuccess.css'
const Client = ()=>{
    const navigation = useNavigate();
    const location = useLocation();
    const { state } = location;

    const [showDrivers, setShowDrivers] = useState(false); // State to control displaying drivers
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [showLocations, setShowLocations] = useState(false);

    const handleProfileClick = () => {
      // Functionality for My Profile button
      // Add your logic here
    };
  
    const handleBookRideClick = async (req, res) => {
      
      console.log("Here")
      try {
        const response = await fetch('http://localhost:5000/api/drivers'); // Assuming the API endpoint 
        const data =  await response.json();
        if (Array.isArray(data.drivers)) {
         
          setDrivers(data.drivers);
          setShowDrivers(true);
        } else {
          console.error("Invalid data format received");
        }
    
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    const handleDriverSelect = (driverId, driverName) => {
      // Function to handle selecting a driver
      console.log('Selected Driver ID:', driverId);
      console.log('Selected Driver Name:', driverName);
      
      setSelectedDriver({ id: driverId, name: driverName });
      setShowDrivers(false);
      setShowLocations(true);
    };

    const handleSelectLocation = async (endLocation, fare) => {
      try {
        const user_name = state ? state.name : 'default_user';// Replace 'your_user_id' with the actual user ID
        if (!selectedDriver || !user_name) {
          console.error('Selected driver or user ID is missing');
          return;
        }
    
        const rideData = {
          driver_id: selectedDriver.id,
          driver_name: selectedDriver.name,
          user_name: user_name,
          fare: fare,
          end_location: endLocation,
        };
        console.log('Ride Data:', rideData);
    
        const response = await fetch('http://localhost:5000/api/set_ride', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rideData),
        });
    
        if (response.ok) {
          // Handle successful API call
         
          console.log('Ride successfully created!');
          // Reset state or perform other operations as needed
          const data = await response.json();
          setSelectedDriver(null);
          setShowLocations(false);

          navigation('/ride_success', {
            state: {
              rideData: data,
            },
          });
        } else {
          console.error('Failed to create ride');
        }
      } catch (error) {
        console.error('Error creating ride:', error);
      }
    };
  
    const locations = [
      { name: "Gulberg", fare: 1000 },
      { name: "Thokar", fare: 2000 },
      { name: "Bedian Road", fare: 500 },
      { name: "Old Lahore", fare: 1500 },
      { name: "Johar Town", fare: 1700 },
    ];


    return (
      <div className="client">
        <nav className="sidebar">
          <h2>Welcome, {state ? state.name : "Faisal"}!</h2>
          <button className="sidebar-button" onClick={handleProfileClick}>
            My Profile
          </button>
          <button className="sidebar-button" onClick={handleBookRideClick}>
            Book a Ride
          </button>
        </nav>
        <main>
          {showDrivers ? (
            <div className="driver-details">
              {drivers.map((driver, index) => (
                <div key={index} className="driver-block">
                  <h3>{driver.name}</h3>
                  <p>Phone Number: {driver.phoneNumber}</p>
                  <p>Car Name: {driver.carName}</p>
                  <p>License Number: {driver.licenseNumber}</p>
                  <button onClick={() => handleDriverSelect(driver._id, driver.name)} className="select-driver-button">
                    Select Driver
                  </button>
                </div>
              ))}
            </div>
          ) : showLocations ? (
              <div className="location-details">
                {locations.map((location, index) => (
                  <div key={index} className="location-block">
                    <h3>{location.name}</h3>
                    <p>Fare: {location.fare}</p>
                    <button  onClick={() => handleSelectLocation(location.name, location.fare)}>Select Location</button>
                  </div>
              ))}
            </div>
          )  : (
            <div className="welcome-message">
              <h2>Welcome, {state ? state.name : "Faisal"}!</h2>
            </div>
          )}
        </main>
      </div>
    );
  
    
}

export default Client;