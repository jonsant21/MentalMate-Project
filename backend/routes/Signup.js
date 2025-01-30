const express = require('express');
const connection = require('../database/DBconnection');
const router = express.Router();


//Routes/Endpoints:

router.post('/', (req, res) => {

    const { username, email, password } = req.body;
    let query = 'INSERT INTO USER (USERNAME, PASSWORD, EMAIL) VALUES(?, ?, ?);';

    connection.query(query, [username, password, email], (err, results) =>{
        
        //Database error: perhaps the username/email is already taken
        if(err){
            return res.status(500).json({ message: 'Database error' });
        }

        return res.json({message: "Successfully created user"});

    });
    
});


module.exports = router;