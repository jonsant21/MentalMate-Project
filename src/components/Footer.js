import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom'; // 👈 use Link instead of <a>

function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 MentalMate. All rights reserved.</p>
      <ul className="footer-links">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
