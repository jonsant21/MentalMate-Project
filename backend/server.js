//env file (sensitive information):
require('dotenv').config();

//Importing libraries:
const express = require("express");
const cors = require("cors");
const session = require("./middleware/session");



//Importing Routes:
const login = require('./routes/Login');
const signup = require('./routes/Signup');
const validateLogin = require('./routes/ValidateLogin');
const logout = require('./routes/Logout');
const journal = require("./routes/Journal");
const chatbot = require("./routes/ChatBot");

//Initializing Express:
const app = express();

//Middleware: .use() in Express adds middleware to the request/response handling pipeline
app.use(cors());
app.use(express.json());
app.use(session);

// Mounting routes to app:
// Urls that start with https://localhost:8081/login(/)
// will be directed to all the routes on Users.js (login) and etc.
app.use('/login', login);
app.use('/sign-up', signup);
app.use('/validate-login', validateLogin);
app.use('/logout', logout);
app.use('/journal', journal);
app.use('/chatbot', chatbot);

app.get("/", (req, res) => {
    return res.json({message: "Hello from the backend"})
});

app.listen(8081, () => {
    console.log("Listening");
})