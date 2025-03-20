const express = require('express');
const connection = require('../database/DBconnection');
const router = express.Router();


//Routes/Endpoints:
//http://localhost:8081/profile

router.get('/', (req, res) => {

        return res.json({message: "Welcome to the profile module"});

    });


module.exports = router;