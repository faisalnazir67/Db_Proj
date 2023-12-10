// Login.js

import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
   
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('Login successful!'); // Handle successful login
        // Redirect or perform any necessary actions upon successful login
        const userData = await response.json(); // Assuming the response contains user data
        const { name } = userData; // Extracting the name from user data
      
        navigate('/clientsuccess', { state: { name } });

      } else {
        console.error('Login failed'); // Handle failed login
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">
        Welcome back <span className="lib-name">User</span>
      </div>
      <div className='partition'></div>
      <form className='form' onSubmit={handleLoginSubmit}>
        <div>
          <input className="user-inp" type='text' name = 'email' placeholder='Email' />
        </div>
        <div>
          <input className="pass-inp" type='password' name='password' placeholder='Password' />
        </div>
        <div>
          <button className="sub-button" type='submit'>Login</button>
        </div>
      </form>
      <div className="question">
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Login;
