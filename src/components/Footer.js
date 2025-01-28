import React from 'react';
import '../styles/Footer.css'; // Ensure the Footer.css file exists in the styles folder

function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 MentalMate. All rights reserved.</p>
      <ul className="footer-links">
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/privacy-policy">Privacy Policy</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
