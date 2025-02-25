import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeDashboard.css';

// Array of Affirmations for Random Selection
const affirmations = [
  "You are stronger than you think.",
  "Every day is a fresh start.",
  "You are worthy of love and happiness.",
  "Believe in yourself and your abilities.",
  "Progress, not perfection.",
  "Your feelings are valid.",
  "You are enough just as you are.",
  "Take things one step at a time.",
  "Breathe. You are in control.",
  "You deserve to prioritize your well-being."
];

// Array of Mental Health Tips for Random Selection
const mentalHealthTips = [
  "Take 5 deep breaths right now. It will help reduce stress and refocus your mind.",
  "Take a 10-minute walk outside and soak in some fresh air to reset your thoughts.",
  "Try a short meditation session to calm your mind and reduce stress.",
  "Drink a glass of water to stay hydrated and help improve your mood.",
  "Take a break from your screen for 10 minutes and stretch your body.",
  "Write down 3 things you're grateful for today to boost your mood.",
  "Try practicing mindfulness by focusing on your breathing for a few minutes.",
  "Reach out to a friend or family member for a quick chat to feel connected.",
  "Listen to your favorite music to uplift your spirits and relax.",
  "Take a moment to acknowledge your feelings and let yourself just be."
];

// Function to get a random affirmation
const getRandomAffirmation = () => {
  return affirmations[Math.floor(Math.random() * affirmations.length)];
};

// Function to get a random mental health tip
const getRandomMentalHealthTip = () => {
  return mentalHealthTips[Math.floor(Math.random() * mentalHealthTips.length)];
};

function HomeDashboard() {
  // Call function once to avoid getting a new quote on every render
  const dailyAffirmation = getRandomAffirmation();
  const dailyTip = getRandomMentalHealthTip();

  return (
    <div className="home-dashboard-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Welcome Back to MentalMate</h1>
        <p>Your personalized mental health companion. Start exploring your journey!</p>

        <div className="cta-buttons">
          <Link to="/mood-tracking">
            <button className="cta-button">Track Your Mood</button>
          </Link>
          <Link to="/chat">
            <button className="cta-button">Chat with AI</button>
          </Link>
          <Link to="/journaling">
            <button className="cta-button">Start Journaling</button>
          </Link>
        </div>
      </section>

      {/* Daily Affirmation Section (Fixed) */}
      <section className="daily-affirmation">
        <h2>🌟 Daily Affirmation</h2>
        <p>{dailyAffirmation}</p>
      </section>

      {/* Mental Health Tip Section (Fixed) */}
      <section className="mental-health-tips">
        <h2>🧘 Mental Health Tip</h2>
        <p>{dailyTip}</p>
      </section>

      {/* Other Sections */}
      <section className="recent-mood-entries">
        <h2>📊 Recent Mood Entries</h2>
        <ul>
          <li>😊 Feeling Happy - Yesterday</li>
          <li>😔 A Bit Down - 2 days ago</li>
          <li>😌 Calm & Relaxed - 3 days ago</li>
        </ul>
        
        <Link to="/mood-tracking">
          <button className="small-button">View All</button>
        </Link>
      </section>

      <section className="journaling-preview">
        <h2>📖 Your Last Journal Entry</h2>
        <p>
          "HelloWorld"
        </p>
        <Link to="/journaling">
          <button className="small-button">Continue Writing</button>
        </Link>
      </section>
    </div>
  );
}

export default HomeDashboard;
