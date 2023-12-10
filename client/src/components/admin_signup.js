// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css'; // Create a new CSS file for signup styles

const Signup = () => {
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state

    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      const response = await fetch('http://localhost:5000/api/adminsignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        console.log('Signup successful!');
        navigate('/admin_success');
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-header">
        Admin Signup <span className="lib-name">System</span>
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
          <button className="sub-button" type='submit' disabled={loading}>
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </div>
      </form>
      <div className="question">Already have an account? <a href="/">Login</a></div>
    </div>
  );
};

export default Signup;
