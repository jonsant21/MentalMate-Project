import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Chat from './pages/Chat';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Contact from './pages/Contact'; // Import Contact
import PrivacyPolicy from './pages/PrivacyPolicy'; // Import Privacy Policy



function App() {
  return (
    <Router>
      <Navbar /> {/* Add the Navbar here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} /> {/* Contact Route */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Privacy Policy Route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

