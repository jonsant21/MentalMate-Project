const express = require('express');
const connection = require('../database/DBconnection');
const router = express.Router();

//there should probabaly be some check here to make sure the user is logged in (ValidateLogin.js :o)
//before even touching this module, since it assumes the user is already logged in at this point:
//its using the session values that are initiated at login.


//Routes/Endpoints:


//save-journal: 
//Function: saves the journal written by user: seems to work just fine
//Tested: Yes. 
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
//Function: query the database to collect all journal entries that the user has written
//Tested: Yes. Once more values are inserted in the database, I'll perform more tests.
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
//Tested: Yes. 
router.delete('/delete-journal', (req, res) => {

    const {journalID} = req.body;

    let query = 'DELETE FROM JOURNAL WHERE ID = ?';
    
            connection.query(query, [journalID], (err, results) =>{
                if(err){
                 return res.status(500).json({ message: 'Database error' });
                }
    
                return res.json({message: `Journal enrty ${journalID} deleted successfully.`});
            });
        
    });


//TODO:
//Update Journal:
//Updates an existing journal. Writes to update_date variable to MYSQL, as well as updates the content/title if changed.
//Tested: Yes
router.post('/update-journal', (req, res) => {

    //Initializing the current date(for updated_time variable):
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const currentDate = `${year}-${month}-${day}`;

    // Get the current time as a string: 24 hour time
    const currentTime = date.toLocaleTimeString('en-US', { hour12: false });

    //Combining them together:
    const updatedDateTime = `${currentDate} ${currentTime}`;


    // Retrieve journal info: the journal id is also needed
    const {title, content, journalID} = req.body;
    
    //SQL query:
    let query = 'UPDATE JOURNAL SET UPDATE_DATE = ?, TITLE = ?, CONTENT = ? WHERE ID = ?';

    connection.query(query, [updatedDateTime, title, content, journalID], (err, results) =>{
        if(err){
            return res.status(500).json({ message: 'Database error' });
        }

        return res.json({message: `Journal entry ${journalID} updated successfully.`});
    });
});







module.exports = router;