import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavbarHomeDashboard.css'; // Assuming your CSS is in this file

function NavbarHomeDashboard() {
  return (
    <div className="navbar-home-dashboard">
      {/* MentalMate Logo */}
      <div className="logo">
        <img src="/MentalMate Logo 02-26.png" alt="MentalMate Logo" className="logo-img" />
      </div>

      {/* Navbar Links */}
      <nav className="navbar-home-dashboard">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/mood-tracking">Mood Tracking</Link></li>
          <li><Link to="/journaling">Journaling</Link></li>
          <li><Link to="/chat">Chat</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          
          {/* Change the Logout button to redirect to Home */}
          <li><Link to="/home">Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default NavbarHomeDashboard;
