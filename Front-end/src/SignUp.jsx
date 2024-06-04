import React, { useState } from 'react';
import axios from 'axios';
import './SignupForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSignUp, setSignUp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    setSignUp(true);
    setValidationError('');
    setSuccessMessage('');
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    setSignUp(false);
    setValidationError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isSignUp && formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match');
      return;
    }
  
    try {
      const endpoint = isSignUp ? 'signup' : 'signin';
      const response = await axios.post(`http://localhost:3001/api/auth/${endpoint}`, formData);
  
      setSuccessMessage(isSignUp ? 'Successfully registered!' : 'Successfully logged in!');
      setValidationError('');
  
      // Redirect to test.html if login/signup is successful
      window.location.href = 'http://127.0.0.1:5500/html/index.html';
    } catch (error) {
      setSuccessMessage('');
      setValidationError(error.response.data.message || `${isSignUp ? 'Signup' : 'Signin'} failed`);
    }
  };
  
  return (
    <div className="form-container">
      <div className="form-toggle">
        <button className={!isSignUp ? 'active' : ''} onClick={handleSignInClick}>
          Sign In
        </button>
        <button className={isSignUp ? 'active' : ''} onClick={handleSignUpClick}>
          Sign Up
        </button>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        {isSignUp && (
          <input
            type="text"
            placeholder="Your Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          placeholder="Your Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {isSignUp && (
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
      </form>

      {validationError && <div className="alert alert-danger">{validationError}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
    </div>
  );
};

export default SignupForm;
