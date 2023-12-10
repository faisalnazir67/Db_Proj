import React from 'react';
import { useNavigate } from 'react-router-dom';

const DriverDashboard = () => {
  const navigation = useNavigate();

  const handleLogoutClick = async () => {
    try {
      console.log("Logging out...");
      const driverToken = localStorage.getItem("driver_token");
      console.log("Driver token:", driverToken);

      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": driverToken,
        },
      });

      console.log("Logout response:", response);

      if (response.ok) {
        console.log("Logout successful!");
        localStorage.removeItem("driver_token");
        navigation("/");
      } else {
        // Handle non-successful status codes
        const errorMessage = await response.text();
        console.error("Logout failed:", errorMessage);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div>
      <h1>Welcome, Driver</h1>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default DriverDashboard;
