const express = require('express');
const router = express.Router();


//Testing session: if logged in before, will output user info
//if not, will ask to log in:
router.get('/', (req, res) => {
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

module.exports = router;