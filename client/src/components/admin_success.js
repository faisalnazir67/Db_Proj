import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signupSuccessful.css";

const DriverSignupSuccessful = () => {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      console.log("Logging out...");
      const adminToken = localStorage.getItem("admin_token");
      console.log("Admin token:", adminToken);

      const response = await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: adminToken,
        },
      });

      console.log("Logout response:", response);

      if (response.ok) {
        console.log("Logout successful!");
        localStorage.removeItem("admin_token");
        navigate("/");
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
    <div className="signup-successful-page">
      <h2>Driver Signup Successful!</h2>
      <p>Your account has been successfully created.</p>
      <button onClick={handleLogoutClick}>Go to Driver Login Page</button>
    </div>
  );
};

export default DriverSignupSuccessful;
