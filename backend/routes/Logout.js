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
        req.session.destroy((err) => {
            if (err){
                return res.status(500).send("Could not delete session.");
            }
            res.send("Session deleted successfully (Logged out)");
        })
    }
    
    
});

module.exports = router;