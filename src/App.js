import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar for general pages
import NavbarHomeDashboard from './components/NavbarHomeDashboard'; // Import HomeDashboard Navbar
import Footer from './components/Footer';
import Home from './pages/Home'; // Home page
import About from './pages/About'; // About page
import Chat from './pages/Chat'; // Chat page
import SignUp from './pages/SignUp'; // SignUp page
import Login from './pages/Login'; // Login page
import Contact from './pages/Contact'; // Contact page
import PrivacyPolicy from './pages/PrivacyPolicy'; // Privacy Policy page
import Journaling from './pages/Journaling'; // Journaling page
import HomeDashboard from './pages/HomeDashboard'; // HomeDashboard page
import MoodTracking from './pages/MoodTracking'; // MoodTracking page
import Profile from './pages/Profile'; // Profile page (ensure this file exists)

function App() {
  return (
    <Router>
      <NavbarConditionalWrapper />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/journaling" element={<Journaling />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/mood-tracking" element={<MoodTracking />} />
        <Route path="/profile" element={<Profile />} /> {/* Add your Profile route here */}
      </Routes>

      <Footer />
    </Router>
  );
}

// Wrapper component that uses `useLocation` inside `<Router>`
function NavbarConditionalWrapper() {
  const location = useLocation(); // Get current location

  return (
    // Conditionally render navbar based on the current route
    location.pathname === "/home-dashboard" || 
    location.pathname === "/mood-tracking" || 
    location.pathname === "/journaling" || 
    location.pathname === "/chat" || 
    location.pathname === "/profile" ? (
      <NavbarHomeDashboard /> // Render NavbarHomeDashboard for HomeDashboard, Chat, Profile, and other relevant pages
    ) : (
      <Navbar /> // Render Navbar for general pages like Home, About, SignUp, and Login
    )
  );
}

export default App;
