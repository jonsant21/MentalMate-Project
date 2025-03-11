import React, { useState } from 'react';
import '../styles/MoodTracking.css';

function MoodTracking() {
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Mood:', mood);
    console.log('Notes:', notes);

    try{
      const response = await fetch('http://localhost:8081/mood', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({mood, notes}),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      }
    }

  catch (error) {
    console.log(error);
  }
}


  return (
    <div className="mood-tracking-container">
      <h1 className="title">Track Your Mood</h1>
      <form onSubmit={handleSubmit} className="mood-tracking-form">
        <div className="form-group">
          <label htmlFor="mood">How are you feeling today?</label>
          <select
            id="mood"
            value={mood}
            onChange={handleMoodChange}
            required
            className="mood-dropdown"
          >
            <option value="">Select your mood</option>
            <option value="happy">😊 Happy</option>
            <option value="sad">😢 Sad</option>
            <option value="angry">😠 Angry</option>
            <option value="neutral">😐 Neutral</option>
            <option value="stressed">😣 Stressed</option>
            <option value="excited">😆 Excited</option>
            <option value="anxious">😨 Anxious</option>
            <option value="relaxed">😌 Relaxed</option>
            <option value="bored">😒 Bored</option>
            <option value="motivated">💪 Motivated</option>
            <option value="hopeful">🤞 Hopeful</option>
            <option value="grateful">🙏 Grateful</option>
            <option value="content">😊 Content</option>
            <option value="confident">😎 Confident</option>
            <option value="overwhelmed">😫 Overwhelmed</option>
            <option value="disappointed">😞 Disappointed</option>
            <option value="frustrated">😤 Frustrated</option>
            <option value="lonely">😔 Lonely</option>
            <option value="curious">🤔 Curious</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows="4"
            value={notes}
            onChange={handleNotesChange}
            placeholder="Write about your day or how you're feeling..."
            className="notes-textarea"
          />
        </div>

        <button type="submit" className="submit-button">Submit Mood</button>
      </form>
    </div>
  );
}

export default MoodTracking;
