import React, { useState } from 'react';
import '../styles/SignUp.css'; // Import the CSS for styling

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    password: '',
    username: '',
  });

  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    password: '',
    username: '',
  });
  
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    // Validate First Name
    if (!formData.firstName) {
      errors.firstName = 'First Name is required';
      valid = false;
    }

    // Validate Last Name
    if (!formData.lastName) {
      errors.lastName = 'Last Name is required';
      valid = false;
    }

    // Validate Email
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!formData.email) {
      errors.email = 'Email is required';
      valid = false;
    } else if (!emailPattern.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      valid = false;
    }

    // Validate Date of Birth
    if (!formData.dob) {
      errors.dob = 'Date of Birth is required';
      valid = false;
    }

    // Validate Gender
    if (!formData.gender) {
      errors.gender = 'Gender is required';
      valid = false;
    }

    // Validate Phone Number
    const phonePattern = /^[0-9]{10}$/; // Assuming phone number is 10 digits
    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
      valid = false;
    } else if (!phonePattern.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid 10-digit phone number';
      valid = false;
    }

    // Validate Username
    if (!formData.username) {
      errors.username = 'Username is required';
      valid = false;
    }

    // Validate Password
    if (!formData.password) {
      errors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    setErrorMessages(errors); // Set the error messages for each field
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Reset success message

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await fetch('http://localhost:8081/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message); // Display success message
      } else {
        setErrorMessages({ global: result.error }); // Display error message globally
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      setErrorMessages({ global: 'Something went wrong, please try again later.' });
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errorMessages.firstName && <p className="error-message">{errorMessages.firstName}</p>}
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errorMessages.lastName && <p className="error-message">{errorMessages.lastName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errorMessages.email && <p className="error-message">{errorMessages.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          {errorMessages.dob && <p className="error-message">{errorMessages.dob}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errorMessages.gender && <p className="error-message">{errorMessages.gender}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {errorMessages.phoneNumber && <p className="error-message">{errorMessages.phoneNumber}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errorMessages.username && <p className="error-message">{errorMessages.username}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errorMessages.password && <p className="error-message">{errorMessages.password}</p>}
        </div>

        <button type="submit">Sign Up</button>
      </form>

      {/* Global error message */}
      {errorMessages.global && <p className="error-message">{errorMessages.global}</p>}

      {/* Display success message */}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default SignUp;
