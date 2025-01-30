const express = require('express');
const connection = require('../database/DBconnection');
const router = express.Router();


//Routes/Endpoints:

router.post('/log-in', (req, res) => {
    // Destructuring the data from the request body
    //must be the same variable names from front (email,password)

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
        return res.json({message: `Info saved successfully in the backend. Hello ${req.session.username}`});
    });
});




//Testing session: if logged in before, will output user info
//if not, will ask to log in:
router.get('/validate-login', (req, res) => {
    if (req.session.username) {
        return res.json({
            message: "Logged in before",
            User: req.session.username,
            Password: req.session.email
        })
    }
    else {
        return res.send("Have not logged in before. Please log in")
    }
});



//deleting session: delete saved session (if logged in)
router.get('/logout', (req, res) => {
    if (!req.session.username) {
        res.json({
            message: "No session saved"

        });
    }

    else{
        req.session.destroy((err) => {
            if (err){
                return res.status(500).send("Could not delete session.");
            }
            res.send("Session deleted successfully (Logged out)");
        })
    }
    
    
});



module.exports = router;
