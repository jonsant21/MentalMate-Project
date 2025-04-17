import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Auth context

// Navbars
import Navbar from './components/Navbar';
import NavbarHomeDashboard from './components/NavbarHomeDashboard';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Chat from './pages/Chat';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Journaling from './pages/Journaling';
import HomeDashboard from './pages/HomeDashboard';
import MoodTracking from './pages/MoodTracking';
import Profile from './pages/Profile';

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
        <Route path="/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </Router>
  );
}

// ✅ Chooses the navbar based on login state
function NavbarConditionalWrapper() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  // Optional: hide all navbars on some routes like /login or /signup if desired
  const hideNavOn = ['/login', '/signup'];
  const shouldHideNav = hideNavOn.includes(location.pathname);

  if (shouldHideNav) return null;

  return isLoggedIn ? <NavbarHomeDashboard /> : <Navbar />;
}

export default App;
