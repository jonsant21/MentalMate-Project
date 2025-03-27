const express = require('express');
const connection = require('../database/DBconnection');
const router = express.Router();


//Routes/Endpoints:
//http://localhost:8081/profile

router.get('/', (req, res) => {

        return res.json({message: "Welcome to the profile module"});

    });




//http://localhost:8081/profile/get-info
//A DB connection isn't necessary; info is retrieved and saved in the session when logged in.
//return session values in a json:

router.get('/get-info', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Session expired or not logged in' });
      }  
    
    else{
        return res.json({
            username: req.session.username,
            email: req.session.email,
            firstName: req.session.firstName,
            lastName: req.session.lastName,
            gender: req.session.gender
        })
    }

});


module.exports = router;