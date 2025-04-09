const express = require('express');
const connection = require('../database/DBconnection');
const router = express.Router();
const { check, validationResult } = require('express-validator'); 


//Routes/Endpoints:
//http://localhost:8081/profile

router.get('/', (req, res) => {

        return res.json({message: "Welcome to the profile module"});

    });


//http://localhost:8081/profile/get-info
//return session values in a json:

router.get('/get-info', (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Session expired or not logged in' });
    }
  
    let query = 'SELECT FIRST_NAME, EMAIL, GENDER, DOB, PHONE_NUMBER, USERNAME FROM USER WHERE ID = ?'
    connection.query(query, [req.session.userId], (err, results) => {
        if(err){
            return res.status(500).json({ message: 'Database error' });
        }
        console.log("Results of logging into profile", results)
        return res.json({firstName: results[0].FIRST_NAME,
                             email: results[0].EMAIL,
                             gender: results[0].GENDER,
                             dateOfBirth: results[0].DOB,
                             phone: results[0].PHONE_NUMBER,
                             nickName: results[0].USERNAME});
    });
  });
  

//http://localhost:8081/profile/update-info
//updates the user's current information. Makes sure that the email/phone number is valid first, then checks if its already taken
//if it passes, user's info is updated, and reflected to the client.

  router.put('/update-info', [
    // Validation for email and phone
    check('email').isEmail().withMessage('Please provide a valid email address'),
    check('phone').isMobilePhone().withMessage('Please provide a valid phone number'),
  ], async (req, res) => {
    // Check if the session exists
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Session expired or not logged in' });
    }
  
    const { email, phone, firstName, nickName, gender, dateOfBirth } = req.body;
  
    // Validate incoming data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      // Check if the nickname was changed
      if (nickName !== req.session.username) {
        // Ensure the new nickname is not taken by any other user, excluding the current user
        const [userExists] = await connection.promise().query(
          'SELECT 1 FROM USER WHERE USERNAME = ? AND ID != ?',
          [nickName, req.session.userId]
        );
  
        if (userExists.length > 0) {
          return res.status(400).json({ message: 'Username is already taken' });
        }
      }
  
      // Check if the phone number was changed and is already in use
      if (phone !== req.session.phoneNumber) {
        // Ensure the new phone number is not already in use by any other user, excluding the current user
        const [phoneExists] = await connection.promise().query(
          'SELECT 1 FROM USER WHERE PHONE_NUMBER = ? AND ID != ?',
          [phone, req.session.userId]
        );
  
        if (phoneExists.length > 0) {
          return res.status(400).json({ message: 'Phone number is already in use' });
        }
      }
  
      // Update user profile in the database
      const [result] = await connection.promise().query(
        `UPDATE USER SET FIRST_NAME = ?, USERNAME = ?, GENDER = ?, DOB = ?, EMAIL = ?, PHONE_NUMBER = ? WHERE ID = ?`,
        [firstName, nickName, gender, dateOfBirth, email, phone, req.session.userId]
      );
  
      // Send a success response after the update
      return res.json({ email, phone, firstName, nickName, gender, dateOfBirth });
    } catch (error) {
      res.status(500).json({ message: 'Server error while updating profile' });
    }
  });




  ////http://localhost:8081/profile/delete-user
  //Deletes user. Also deletes session. 
  router.delete('/delete-user', (req, res) => {

    if (!req.session.userId) {
      return res.status(401).json({ message: 'Session expired or not logged in' });
    }

    let query = 'DELETE FROM USER WHERE ID = ?';
    connection.query(query, [req.session.userId], (err, results) => {
      if(err){
          return res.status(500).json({ message: 'Database error' });
      }
      req.session.destroy((err) => {
        if (err){
            return res.status(500).send("Could not delete session.");
        }
        return res.json({message: "Session/User destroyed"});
    })
  });

    

});

router.put('/change-password', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Session expired or not logged in' });
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Both current and new passwords are required.' });
  }

  // Step 1: Get the user's current password
  let selectQuery = 'SELECT PASSWORD FROM USER WHERE ID = ?';
  connection.query(selectQuery, [req.session.userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error when fetching user' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const password = results[0].PASSWORD;

    // Step 2: Compare current password
    if (password != currentPassword) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Step 3: Update password in DB
    let updateQuery = 'UPDATE USER SET PASSWORD = ? WHERE ID = ?';
    connection.query(updateQuery, [newPassword, req.session.userId], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error when updating password' });
      }

      return res.json({ message: 'Password updated successfully' });
    });
  });
});
  
  

  


module.exports = router;