const exSession = require("express-session");


// consider this as a secure global variable that
// stores the user info securely 
// once valid login store into the sesion object:

const session = exSession({
    secret: "TO BE CHANGED IN DEPLOYMENT IN .ENV",
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        maxAge: 1000*60*60
    }
})

module.exports = session;