const express = require('express');
const router = express.Router();

//deleting session: delete saved session (if logged in)

//http://localhost:8081/logout

router.get('/', (req, res) => {

    if (!req.session.username) {
        res.json({
            message: "No session saved"

        });
    }

    else{
        console.log("Session before: ", req.session)

        req.session.destroy((err) => {
            if (err){
                return res.status(500).send("Could not delete session.");
            }
            console.log("Session after: ", req.session)
            return res.json({message: "Session deleted successfully (Logged out)"});
        })
    }
    
    
});

module.exports = router;