const express = require('express');
const connection = require('../database/DBconnection');
const router = express.Router();


//Routes/Endpoints:

//http://localhost:8081/login

router.post('/', (req, res) => {
    // Destructuring the data from the request body
    //must be the same variable names from front (email,password)
    console.log("Session before login:", req.session)

    const { email, password } = req.body;
    
    //SQL query:
    let query = 'SELECT * FROM USER WHERE EMAIL = ? AND PASSWORD = ?';

    connection.query(query, [email, password], (err, results) =>{
        if(err){
            return res.status(500).json({ message: 'Database error' });
        }

        //not found in database:
        if(results.length === 0){
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        //at this point, there was a DB hit. Save the session:
        req.session.email = email;
        req.session.password = password;
        req.session.username = results[0].USERNAME;
        req.session.userId = results[0].ID;

        console.log("Session after login: ", req.session)
        
        return res.json({message: `Info saved successfully in the backend. Hello ${req.session.username}, with ID number ${req.session.userId}`});
    });
});




module.exports = router;
