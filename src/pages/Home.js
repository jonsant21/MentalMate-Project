import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { FaUserCheck, FaBrain, FaChartLine } from 'react-icons/fa'; // Import icons

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome to MentalMate</h1>
        <p>Your personalized mental health companion. Explore features like mood tracking, personalized suggestions, and mindfulness resources.</p>
        <Link to="/login">
          <button className="cta-button">Get Started</button>
        </Link>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-container">
          <div className="testimonial">
            <p>“This app changed my life! The chatbot is so supportive and helpful.”</p>
            <span>- Alex K.</span>
          </div>
          <div className="testimonial">
            <p>“I love how personalized the suggestions are. It really understands me.”</p>
            <span>- Maria S.</span>
          </div>
          <div className="testimonial">
            <p>“Finally, a platform that makes mental health support accessible 24/7!”</p>
            <span>- John D.</span>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <FaUserCheck className="feature-icon" />
            <h3>Personalized Support</h3>
            <p>Receive tailored advice and emotional support based on your mood and needs.</p>
          </div>
          <div className="feature-card">
            <FaBrain className="feature-icon" />
            <h3>Mindfulness Resources</h3>
            <p>Access tools and techniques to practice mindfulness and reduce stress.</p>
          </div>
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Mood Tracking</h3>
            <p>Track your daily mood and view insights to better understand your mental health.</p>
          </div>
        </div>
      </section>

      {/* Feature Benefits Section */}
      <section className="benefits-section">
        <h2>Why Choose MentalMate?</h2>
        <p>We're here to support you with tailored solutions and tools to enhance your mental health journey.</p>
        <ul className="benefits-list">
          <li>
            <span>🌟</span> Available 24/7 to support your mental health journey.
          </li>
          <li>
            <span>🔍</span> Tailored insights to help you grow and reflect.
          </li>
          <li>
            <span>🧘‍♂️</span> Scientifically-backed mindfulness practices.
          </li>
        </ul>
      </section>

    </div>
  );
}

export default Home;
