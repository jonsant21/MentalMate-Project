import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Import the react-calendar component
import '../styles/MoodTracking.css';

function MoodTracking() {
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); // Track the selected date
  const [moodHistory, setMoodHistory] = useState({}); // Store the mood history
  const [errorMessage, setErrorMessage] = useState(''); // Error message for invalid date input

  // Define colors for each mood
  const moodColors = {
    happy: '#ffeb3b',
    sad: '#2196f3',
    angry: '#f44336',
    neutral: '#9e9e9e',
    stressed: '#ff9800',
    excited: '#8bc34a',
    anxious: '#ff5722',
    relaxed: '#8e24aa',
    bored: '#757575',
    motivated: '#4caf50',
    hopeful: '#00bcd4',
    grateful: '#c2185b',
    content: '#4caf50',
    confident: '#9c27b0',
    overwhelmed: '#e91e63',
    disappointed: '#3f51b5',
    frustrated: '#f44336',
    lonely: '#607d8b',
    curious: '#8bc34a'
  };

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


    // Save the selected mood for the selected date
    setMoodHistory({
      ...moodHistory,
      [selectedDate.toDateString()]: { mood, notes }, // Store the mood by date
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date
    setErrorMessage(''); // Reset error message on new date selection

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

    if (date < today) {
      setErrorMessage('You cannot set or change moods for past dates.');
    } else if (date > today) {
      setErrorMessage('You cannot set or change moods for future dates.');
    }
  };

  const getMoodForDate = (date) => {
    // Get the mood for the selected date
    const dateString = date.toDateString();
    return moodHistory[dateString] ? moodHistory[dateString].mood : 'No mood set';
  };

  const getMoodColor = (mood) => {
    // Get the color for the given mood
    return moodColors[mood] || '#f0f0f0'; // Default to gray if no mood found
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

  // Disable mood inputs and submit button if the selected date is in the future or past
  const isFutureDate = selectedDate > today;
  const isPastDate = selectedDate < today;

  // Fix the date to be the 1st of the month for correct alignment
  const goToPreviousMonth = () => {
    const prevMonth = new Date(selectedDate);
    prevMonth.setMonth(selectedDate.getMonth() - 1);
    prevMonth.setDate(1); // Set the day to 1st of the previous month
    setSelectedDate(prevMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(selectedDate);
    nextMonth.setMonth(selectedDate.getMonth() + 1);
    nextMonth.setDate(1); // Set the day to 1st of the next month
    setSelectedDate(nextMonth);
  };

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
            disabled={isFutureDate || isPastDate} // Disable mood input for future or past dates
          >
            <option value="">Select your mood</option>
            {Object.keys(moodColors).map((moodOption) => (
              <option key={moodOption} value={moodOption}>
                {moodOption.charAt(0).toUpperCase() + moodOption.slice(1)}
              </option>
            ))}
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
            disabled={isFutureDate || isPastDate} // Disable notes input for future or past dates
          />
        </div>

        <button type="submit" className="submit-button" disabled={isFutureDate || isPastDate}>
          Submit Mood
        </button>
      </form>

      {/* Error Message Section */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Calendar Section */}
      <div className="calendar-container">
        <h2 className="calendar-title">
          {/* Display the selected month's name and year */}
          {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
        </h2>

        {/* Month Navigation Buttons */}
        <div className="month-navigation">
          <button onClick={goToPreviousMonth} className="navigation-button">
            Previous Month
          </button>
          <button onClick={goToNextMonth} className="navigation-button">
            Next Month
          </button>
        </div>

        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          minDate={new Date(today.getFullYear(), today.getMonth(), 1)} // Allow viewing previous months
          tileContent={({ date }) => {
            const moodForDate = getMoodForDate(date);
            const color = getMoodColor(moodForDate);
            return (
              <div
                className="mood-tile"
                style={{ backgroundColor: color }}
              >
                {moodForDate}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
}

export default MoodTracking;
