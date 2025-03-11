import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Assuming you want to use the same styles
import { useNavigate } from 'react-router-dom';

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
    <nav className="navbar">
      <h1>MentalMate</h1>
      <ul className="nav-links">
        <li><Link to="/home-dashboard">Home</Link></li>
        <li><Link to="/mood-tracking">Mood Tracking</Link></li>
        <li><Link to="/journaling">Journaling</Link></li>
        <li><Link to="/chat">Chat</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li> {/* Button for logout */}
      </ul>
    </nav>
  );
}

export default NavbarHomeDashboard;
