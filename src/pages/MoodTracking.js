// src/components/MoodTracking.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';    // ← make sure this is here
import '../styles/MoodTracking.css';

function MoodTracking() {
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [moodHistory, setMoodHistory] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const moodColors = {
    happy: '#ffeb3b', sad: '#2196f3', angry: '#f44336',
    neutral: '#9e9e9e', stressed: '#ff9800', excited: '#8bc34a',
    anxious: '#ff5722', relaxed: '#8e24aa', bored: '#757575',
    motivated: '#4caf50', hopeful: '#00bcd4', grateful: '#c2185b',
    content: '#4caf50', confident: '#9c27b0', overwhelmed: '#e91e63',
    disappointed: '#3f51b5', frustrated: '#f44336', lonely: '#607d8b',
    curious: '#8bc34a'
  };

  // Load saved mood history on mount
  useEffect(() => {
    fetch('http://localhost:8081/mood')
      .then(res => res.json())
      .then(setMoodHistory)
      .catch(console.error);
  }, []);

  const handleMoodChange = e => setMood(e.target.value);
  const handleNotesChange = e => setNotes(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    // Optimistic UI update
    setMoodHistory({
      ...moodHistory,
      [selectedDate.toDateString()]: { mood, notes },
    });
    try {
      const res = await fetch('http://localhost:8081/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ date: selectedDate, mood, notes }),
      });
      const data = await res.json();
      console.log(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    setErrorMessage('');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) setErrorMessage('Cannot set moods for past dates.');
    else if (date > today) setErrorMessage('Cannot set moods for future dates.');
  };

  const getMoodForDate = date => {
    const entry = moodHistory[date.toDateString()];
    return entry ? entry.mood : null;
  };

  const getMoodColor = key => moodColors[key] || '#f0f0f0';

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const isPast = selectedDate < today;
  const isFuture = selectedDate > today;

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
            disabled={isPast || isFuture}
          >
            <option value="">Select your mood</option>
            {Object.keys(moodColors).map(key => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Additional Notes</label>
          <textarea
            id="notes"
            rows="4"
            value={notes}
            onChange={handleNotesChange}
            placeholder="Write about your day..."
            disabled={isPast || isFuture}
          />
        </div>

        <button type="submit" disabled={isPast || isFuture}>
          Submit Mood
        </button>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          locale="en-US"   // optional, controls locale formatting
          tileContent={({ date, view }) =>
            view === 'month' && getMoodForDate(date) ? (
              <div
                className="mood-tile"
                style={{ backgroundColor: getMoodColor(getMoodForDate(date)) }}
              >
                {getMoodForDate(date)}
              </div>
            ) : null
          }
        />
      </div>
    </div>
  );
}

export default MoodTracking;
