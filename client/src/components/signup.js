// Signup.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css'; // Create a new CSS file for signup styles

const Signup = () => {
  //to send it to backend 
  const navigate = useNavigate()

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    console.log(name)
    console.log(email)
    console.log(password)

    try {
      const response = await fetch('http://localhost:5000/api/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,email, password }),
      });

      if (response.ok) {
        // Handle successful signup
        console.log('Signup successful!');
        navigate('/sign_success');
        // Redirect or perform any necessary actions upon successful signup
      } else {
        // Handle failed signup
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  
  return (
    <div className="signup-page">
      <div className="signup-header">
        Create an Account <span className="lib-name">System</span>
      </div>
      <div className='partition'></div>
      <form className='form'  onSubmit={handleFormSubmit}>
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
          <button className="sub-button" type='submit'>Signup</button>
        </div>
      </form>
      <div className="question">Already have an account? <a href="/">Login</a></div>
    </div>
  );
};

export default Signup;
