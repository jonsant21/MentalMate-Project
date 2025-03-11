const expressSession = require("express-session");

const session = expressSession({
    secret: "TO BE CHANGED IN DEPLOYMENT IN .ENV",  // Use .env for production
    resave: false,  
    saveUninitialized: true,  // Save empty sessions
    cookie: {
        httpOnly: true,  // Cookie cannot be accessed via JavaScript
        maxAge: 1000 * 60 * 60,  // Set the cookie expiration time (1 hour)
        secure: false,  // Set to true for production with HTTPS
    }
});

module.exports = session;