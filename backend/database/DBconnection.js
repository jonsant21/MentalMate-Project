//Import SQL connection:
const sql = require("mysql2");

//values obtained from .env. IP to be changed based on user on .env:
const IP = process.env.DB_IP;
const PASSWORD = process.env.DB_PASS;
const USER = process.env.DB_USER;
const DATABASE = process.env.DB_NAME;

//Connecting to database:
const connection = sql.createPool({
    host: IP,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
});

//Testing connection:
connection.getConnection((err) =>{
    if (err){
        console.log("error connecting", err.stack);
    }
    else{
        console.log("Connected");
    }
})

module.exports = connection;