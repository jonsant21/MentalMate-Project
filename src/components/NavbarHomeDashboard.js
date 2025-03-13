import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/NavbarHomeDashboard.css'; // Assuming your CSS is in this file


function NavbarHomeDashboard() {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8081/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        // Redirect to home after successful logout
        navigate('/');
      } else {
        // Handle logout error
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
  };


  return (

    <div className="navbar-home-dashboard">
      {/* MentalMate Logo */}
      <div className="logo">
        <img src="/MentalMate Logo 02-26.png" alt="MentalMate Logo" className="logo-img" />
      </div>

      {/* Navbar Links */}
      <nav className="navbar-home-dashboard">
        <ul>
          <li><Link to="/home-dashboard">Home</Link></li>
          <li><Link to="/mood-tracking">Mood Tracking</Link></li>
          <li><Link to="/journaling">Journaling</Link></li>
          <li><Link to="/chat">Chat</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          
          {/* Change the Logout button to redirect to Home */}
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </nav>
    </div>

  );
}

export default NavbarHomeDashboard;
