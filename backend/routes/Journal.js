const express = require('express');
const connection = require('../database/DBconnection');
const router = express.Router();

//there should probabaly be some check here to make sure the user is logged in (Validate Login :o)
//before even touching this module, since it assumes the user is already logged in at this point:
//its using the session values that are initiated at login.


//Routes/Endpoints:


//save-journal: saves the journal written by user: seems to work just fine
router.post('/save-journal', (req, res) => {

    //Initializing the current date:
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const currentDate = `${year}-${month}-${day}`;

    // Get the current time as a string: 24 hour time
    const currentTime = date.toLocaleTimeString('en-US', { hour12: false });

    //Combining them together:
    const currentDateTime = `${currentDate} ${currentTime}`;


    // Retrieve journal info:
    const {title, content} = req.body;
    
    //SQL query:
    let query = 'INSERT INTO JOURNAL (TITLE, WRITE_DATE, CONTENT, AUTHOR) VALUES (?, ?, ?, ?)';

    connection.query(query, [title, currentDateTime, content, req.session.userId], (err, results) =>{
        if(err){
            return res.status(500).json({ message: 'Database error' });
        }

        return res.json({message: `Info saved successfully in the backend. Journal saved for ${req.session.username}`});
    });
});






//Retrieve Journal:
//TODO: query the database to collect all journal entries that the user has written
router.get('/', (req, res) => {

let query = 'SELECT * FROM JOURNAL WHERE AUTHOR = ?'

        connection.query(query, [req.session.userId], (err, results) =>{
            if(err){
             return res.status(500).json({ message: 'Database error' });
            }

            return res.json(results);
        });
    
});


//Delete journal:
//TODO: delete the selected journal 







module.exports = router;