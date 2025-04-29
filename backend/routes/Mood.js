const express = require('express');
const connection = require('../database/DBconnection');
const router = express.Router();


//there should probabaly be some check here to make sure the user is logged in (ValidateLogin.js :o)
//before even touching this module, since it assumes the user is already logged in at this point:
//its using the session values that are initiated at login.


//Saves the current day's mood:
//http://localhost:8081/mood

router.post('/', (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Session expired or not logged in' });
    }
  
    const { mood, notes } = req.body;
  
    // Get today's date in YYYY-M-D format
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${year}-${month}-${day}`;
  
    // First, check if mood already exists for today
    const checkQuery = "SELECT * FROM MOOD WHERE USER_ID = ? AND DATE_WRITE = ?";
  
    connection.query(checkQuery, [req.session.userId, currentDate], (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Error checking existing mood:', checkErr);
        return res.status(500).json({ message: 'Database error on check' });
      }
  
      if (checkResults.length > 0) {
        return res.status(409).json({ message: 'Mood already logged for today. Come back tomorrow!' });
      }
  
      // If not logged yet, insert mood
      const insertQuery = "INSERT INTO MOOD (DATE_WRITE, MOOD, ADDITIONAL_NOTE, USER_ID) VALUES (?, ?, ?, ?)";
      connection.query(insertQuery, [currentDate, mood, notes?.trim() ? notes : 'No comment', req.session.userId], (insertErr) => {
        if (insertErr) {
          console.error('Error inserting mood:', insertErr);
          return res.status(500).json({ message: 'Database error on insert' });
        }
  
        return res.json({ message: `Mood logged successfully for ${req.session.username}` });
      });
    });
  });
  



//Get moods: Retrieves all moods from user. Returned in decending order(Highest date first)
//Could possibly be used in the home dashboard. 
//http://localhost:8081/mood/get-moods

router.get('/get-moods', (req, res) => {
    console.log('User ID:', req.session.userId);
    const query = "SELECT DATE_WRITE, MOOD, ADDITIONAL_NOTE FROM MOOD WHERE USER_ID = ?";
  
    connection.query(query, [req.session.userId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
  
      // Format the data 
      const moodHistory = {};
      results.forEach(entry => {
        const dateKey = new Date(entry.DATE_WRITE).toDateString();
        moodHistory[dateKey] = {
          mood: entry.MOOD,
          notes: entry.ADDITIONAL_NOTE
        };
      });
      
      console.log(moodHistory)
      return res.json(moodHistory);
    });
  });
  
  router.get('/get-last-mood', (req, res) => {
    const query = `
        SELECT MOOD, ADDITIONAL_NOTE, DATE_WRITE
        FROM MOOD 
        WHERE USER_ID = ? 
        ORDER BY DATE_WRITE DESC 
        LIMIT 1
    `;

    connection.query(query, [req.session.userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }

        console.log(results);

        if (results.length > 0) {
            const latestEntry = results[0];
            const entryDate = new Date(latestEntry.DATE_WRITE);
            const today = new Date();

            // Check if entryDate is the same day as today
            const isSameDay = entryDate.getFullYear() === today.getFullYear() &&
                              entryDate.getMonth() === today.getMonth() &&
                              entryDate.getDate() === today.getDate();

            if (isSameDay) {
                return res.json({
                    MOOD: latestEntry.MOOD,
                    ADDITIONAL_NOTE: latestEntry.ADDITIONAL_NOTE
                });
            }
        }

        // If no entry or the latest entry is NOT from today
        return res.json({
            MOOD: "None",
            ADDITIONAL_NOTE: "No mood entry available for today. Log one now!"
        });
    });
});





module.exports = router;
    