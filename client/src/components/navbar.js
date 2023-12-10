// Navbar.js

import React from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/navbar.css"; // Import the CSS file

const Navbar = () => {
  const location = useLocation();
  const showNavbar =
    location.pathname === "/" ||
    location.pathname === "/client/login" ||
    location.pathname === "/admin/login" ||
    location.pathname === "/driver/login" ||
    location.pathname === "/Signup";

  if (!showNavbar) {
    return null; // Don't render the Navbar if showNavbar is false
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/client/login">Client Login</Link>
        </li>
        <li>
          <Link to="/admin/login">Admin Login</Link>
        </li>
        <li>
          <Link to="/driver/login">Driver Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
