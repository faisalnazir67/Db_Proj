// Login.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-header">
        Welcome back <span className="lib-name">Admin</span>
      </div>
      <div className='partition'></div>
      <form className='form'>
        <div>
          <input className="user-inp" type='text' placeholder='Username' />
        </div>
        <div>
          <input className="pass-inp" type='password' placeholder='Password' />
        </div>
        <div>
          <button className="sub-button">Login</button>
        </div>
      </form>
      <div className="question">
        Don't have an account? <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Login;
