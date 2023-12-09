import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css'; // Import or create a CSS file for signup styles

const DriverSignup = () => {
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const phoneNumber = event.target.elements.phoneNumber.value;
    const carName = event.target.elements.carName.value;
    const licenseNumber = event.target.elements.licenseNumber.value;

    console.log(name);
    console.log(email);
    console.log(password);
    console.log(phoneNumber);
    console.log(carName);
    console.log(licenseNumber);

    try {
      const response = await fetch('http://localhost:5000/api/driversignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phoneNumber, carName, licenseNumber }),
      });

      if (response.ok) {
        console.log('Driver signup successful!');
        navigate('/driver_success');
      } else {
        console.error('Driver signup failed');
      }
    } catch (error) {
      console.error('Error during driver signup:', error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-header">
        Create a Driver Account
      </div>
      <div className='partition'></div>
      <form className='form' onSubmit={handleFormSubmit}>
        <div>
          <input className="user-inp" type='text' name='name' placeholder='Username' />
        </div>
        <div>
          <input className="email-inp" type='email' name='email' placeholder='Email' />
        </div>
        <div>
          <input className="pass-inp" type='password' name='password' placeholder='Password' />
        </div>
        <div>
          <input className="phone-inp" type='text' name='phoneNumber' placeholder='Phone Number' />
        </div>
        <div>
          <input className="car-inp" type='text' name='carName' placeholder='Car Model' />
        </div>
        <div>
          <input className="license-inp" type='text' name='licenseNumber' placeholder='License Number' />
        </div>
        <div>
          <button className="sub-button" type='submit'>Signup</button>
        </div>
      </form>
      <div className="question">Already have an account? <a href="/">Login</a></div>
    </div>
  );
};

export default DriverSignup;
