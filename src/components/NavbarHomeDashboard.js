import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Assuming you want to use the same styles

function NavbarHomeDashboard() {
  return (
    <nav className="navbar">
      <h1>MentalMate</h1>
      <ul className="nav-links">
        <li><Link to="/home-dashboard">Home</Link></li>
        <li><Link to="/mood-tracking">Mood Tracking</Link></li>
        <li><Link to="/journaling">Journaling</Link></li>
        <li><Link to="/chat">Chat</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/">Logout</Link></li> {/* Just redirects to Home for now */}
      </ul>
    </nav>
  );
}

export default NavbarHomeDashboard;
