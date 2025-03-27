import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeDashboard.css';



async function getRandomAffirmation() {
  try {
    const response = await fetch("http://localhost:8081/chatbot/generate-affirmation"); // Adjust URL if necessary
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error fetching affirmation:", error);
    return "Stay positive!"; // Default fallback affirmation
  }
}



async function getRandomMentalHealthTip() {
  try {
    const response = await fetch("http://localhost:8081/chatbot/generate-tip"); // Adjust URL if necessary
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error fetching mental health tip:", error);
    return "Take care of yourself!"; // Default fallback tip
  }
}


async function getLastJournal() {
  try {
    const response = await fetch("http://localhost:8081/journal/get-last-journal", {
          method: 'GET',
          credentials: 'include', // Ensures cookies (user session) are sent
        }); // Adjust URL if necessary

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data || {};
  } catch (error) {
    console.error("Error fetching journal entry:", error);
    return "Create a new journal!"; // Default fallback tip
  }
}



function HomeDashboard() {
  const [affirmation, setAffirmation] = useState("Loading...");
  const [mentalHealthTip, setMentalHealthTip] = useState("Loading...");
  const [lastJournal, setJournal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const dailyAffirmation = await getRandomAffirmation();
        const dailyTip = await getRandomMentalHealthTip();
        const lastEntry = await getLastJournal();
        setAffirmation(dailyAffirmation);
        setMentalHealthTip(dailyTip);
        setJournal(lastEntry);
      } catch (error) {
        console.error("Error fetching data:", error);
        setAffirmation("Couldn't load affirmation.");
        setMentalHealthTip("Couldn't load tip.");
      }
    }

    fetchData();
  }, []); 

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

      {/* Daily Affirmation Section */}
      <section className="daily-affirmation">
        <h2>🌟 Daily Affirmation</h2>
        <p>{affirmation}</p>
      </section>

      {/* Mental Health Tip Section */}
      <section className="mental-health-tips">
        <h2>🧘 Mental Health Tip</h2>
        <p>{mentalHealthTip}</p>
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
        {lastJournal?.CONTENT || "No journal entry available."}
        </p>
        <Link to="/journaling">
          <button className="small-button">Continue Writing</button>
        </Link>
      </section>
    </div>
  );
}

export default HomeDashboard;
