const express = require('express');
const connection = require('../database/DBconnection');
const router = express.Router();


//Routes/Endpoints:

router.post('/', (req, res) => {

    const {firstName, lastName, email, dob, gender, phoneNumber,  password, username } = req.body;
    
    let query = 'INSERT INTO USER (USERNAME, PASSWORD, EMAIL, FIRST_NAME, LAST_NAME, DOB, GENDER, PHONE_NUMBER) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';

    connection.query(query, [username, password, email, firstName, lastName, dob, gender, phoneNumber], (err, results) =>{
        
        //Database error: perhaps the username/email/phone number is already taken
        if(err){
            return res.status(500).json({message: "Credentials already taken. Please choose another username/email/phone number."});
        }

        return res.json({message: "Successfully created user"});

    });
    
});


module.exports = router;