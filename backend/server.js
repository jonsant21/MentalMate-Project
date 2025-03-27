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
const mood = require("./routes/Mood");
const profile = require("./routes/Profile")

//Initializing Express:
const app = express();

//Middleware: .use() in Express adds middleware to the request/response handling pipeline
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true,  // Allow cookies to be sent
}));

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
app.use('/tts', require('./routes/TTS'));

app.use('/mood', mood);
app.use('/profile', profile)

app.get("/", (req, res) => {
    return res.json({message: "Hello from the backend"})
});

app.listen(8081, () => {
    console.log("Listening");
})