const express = require('express');
const router = express.Router();


//Routes/Endpoints:

router.get('/', (req, res) => {

    return res.json({message: "Welcome to chatbot module."});
        
 });



module.exports = router;