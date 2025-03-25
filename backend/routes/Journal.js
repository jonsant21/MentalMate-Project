const express = require('express');
const connection = require('../database/DBconnection');
const router = express.Router();

//there should probabaly be some check here to make sure the user is logged in (ValidateLogin.js :o)
//before even touching this module, since it assumes the user is already logged in at this point:
//its using the session values that are initiated at login.


//Routes/Endpoints:


//save-journal: 
//Function: saves the journal written by user: seems to work just fine

//http://localhost:8081/journal/save-journal

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
    const {title, entry} = req.body;
    
    //SQL query:
    let query = 'INSERT INTO JOURNAL (TITLE, WRITE_DATE, CONTENT, AUTHOR) VALUES (?, ?, ?, ?)';

    connection.query(query, [title, currentDateTime, entry, req.session.userId], (err, results) =>{
        if(err){
            return res.status(500).json({ message: 'Database error' });
        }

        const newEntryId = results.insertId;

        return res.json({TITLE: title, CONTENT: entry, ID: newEntryId, WRITE_DATE: currentDateTime});
    });
});





//Retrieve Journal:
//Function: query the database to collect all journal entries that the user has written
// http://localhost:8081/journal


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
//Retrieve sends the id of each journal (key) to the front end so just send it back here to delete it
//How? idk lol depends on how the front end displays the journals :p. Something to talk about to the front end team
//Assumptions: the Journal ID is passed down to this function, where it is used to delete it appropriately.

// http://localhost:8081/journal/delete-journal 

router.delete('/delete-journal/:id', (req, res) => {

    const {id} = req.params;
    console.log(id)

    let query = 'DELETE FROM JOURNAL WHERE ID = ?';
    
            connection.query(query, [id], (err, results) =>{
                if(err){
                 return res.status(500).json({ message: 'Database error' });
                }
    
                return res.json({message: `Journal enrty ${id} deleted successfully.`});
            });
        
    });



//Update Journal:
//Updates an existing journal. Writes to update_date variable to MYSQL, as well as updates the content/title if changed.

//http://localhost:8081/journal/update-journal

router.post('/update-journal', (req, res) => {
    const { title, entry, journalID } = req.body;

    // First, retrieve the current WRITE_DATE from the journal entry
    const selectQuery = 'SELECT WRITE_DATE FROM JOURNAL WHERE ID = ?';
    
    connection.query(selectQuery, [journalID], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error while fetching WRITE_DATE' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Journal entry not found' });
        }

        // Get the original WRITE_DATE
        const originalWriteDate = results[0].WRITE_DATE;

        // Initialize the current date and time for the update
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const currentDate = `${year}-${month}-${day}`;
        const currentTime = date.toLocaleTimeString('en-US', { hour12: false });
        const updatedDateTime = `${currentDate} ${currentTime}`;

        // SQL query to update the journal entry
        const updateQuery = 'UPDATE JOURNAL SET UPDATE_DATE = ?, TITLE = ?, CONTENT = ? WHERE ID = ?';

        connection.query(updateQuery, [updatedDateTime, title, entry, journalID], (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Database error during update' });
            }

            // Return the updated entry with the original WRITE_DATE
            return res.json({
                TITLE: title,
                CONTENT: entry,
                ID: journalID,
                WRITE_DATE: originalWriteDate, // Passing the original WRITE_DATE
            });
        });
    });
});








module.exports = router;