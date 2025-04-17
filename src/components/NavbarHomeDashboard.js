import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ✅ Add this
import '../styles/NavbarHomeDashboard.css';

function NavbarHomeDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // ✅ Get logout function

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
        logout(); // ✅ Update state before navigation
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred while logging out:', error);
    }
  };

  return (
    <div className="navbar-home-dashboard">
      <div className="logo">
        <img src="/MentalMate Logo 02-26.png" alt="MentalMate Logo" className="logo-img" />
      </div>

      <nav className="navbar-home-dashboard">
        <ul>
          <li><Link to="/home-dashboard">Home</Link></li>
          <li><Link to="/mood-tracking">Mood Tracking</Link></li>
          <li><Link to="/journaling">Journaling</Link></li>
          <li><Link to="/chat">Chat</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </nav>
    </div>
  );
}

export default NavbarHomeDashboard;
