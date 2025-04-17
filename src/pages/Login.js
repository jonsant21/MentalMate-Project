import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar'; // ✅ Import public navbar
import '../styles/Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth(); // ✅ Get login + state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Log-In Form Data:', formData);

    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);

        login(); // ✅ Set login state
        navigate('/home-dashboard');
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateAccountClick = () => {
    navigate('/signup');
  };

  return (
    <>
      {!isLoggedIn && <Navbar />} {/* ✅ Show Navbar only if not logged in */}

      <div className="login-container">
        <h1>Log In</h1>
        <form className="login-form" onSubmit={handleSubmit}>
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
          </div>
          <button type="submit">Log In</button>
        </form>

        <p className="create-account-link" onClick={handleCreateAccountClick}>
          Create Account?
        </p>
      </div>
    </>
  );
}

export default Login;
