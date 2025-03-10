const express = require('express');
const connection = require('../database/DBconnection');
const router = express.Router();


//there should probabaly be some check here to make sure the user is logged in (ValidateLogin.js :o)
//before even touching this module, since it assumes the user is already logged in at this point:
//its using the session values that are initiated at login.


//Saves the current day's mood:
//http://localhost:8081/mood

router.post('/', (req, res) => {

    //Preprocessing:
    //Retrieving mood and additional notes from frontend
    const { mood, notes } = req.body;

    //Initializing the current date:
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const currentDate = `${year}-${month}-${day}`;

    console.log(mood, notes);

    let query = "INSERT INTO MOOD (DATE_WRITE, MOOD, ADDITIONAL_NOTE, USER_ID) VALUES (?, ?, ?, ?)"
    
    connection.query(query, [currentDate, mood, notes?.trim() ? notes : 'No comment', req.session.userId], (err, results) =>{
        if(err){
            return res.status(500).json({ message: 'Database error' });
        }

        return res.json({message: `Info saved successfully in the backend. Mood of the day saved for ${req.session.username}`});
    });

});



//Check mood: Checks if a mood is logged in for today.
//http://localhost:8081/mood/check-mood

router.get('/check-mood', (req, res) => {

    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const currentDate = `${year}-${month}-${day}`;

    let query = "SELECT * FROM MOOD WHERE USER_ID =  ? AND DATE_WRITE =  ?"

    connection.query(query, [req.session.userId, currentDate], (err, results) =>{
        if(err){
            return res.status(500).json({ message: 'Database error' });
        }

        //Temporary: Ideally, just send the results to frontend and they can check there:

        if (results.length === 0){
            return res.json({message: 'Have not logged mood today'})
        }

        else{
            return res.json({message: 'Mood logged for today. Come back tomorrow!'})
        }
   
    });  
    
});



//Get moods: Retrieves all moods from user. Returned in decending order(Highest date first)
//Could possibly be used in the home dashboard. 
//http://localhost:8081/mood/get-moods

router.post('/get-moods', (req, res) => {

    let query = "SELECT * FROM MOOD WHERE USER_ID = ? ORDER BY DATE_WRITE DESC"


    connection.query(query, [req.session.userId], (err, results) =>{

        if(err){
            return res.status(500).json({ message: 'Database error' });
        }


        else{
            return res.json({output: results})
        }
   
    });
    
 });




module.exports = router;
    