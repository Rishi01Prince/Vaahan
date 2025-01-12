const express = require('express');
const UserMethods = require('./User_Methods.js');
const { check } = require('express-validator');

const router = express.Router();


router.post('/login', UserMethods.isValidCredentials, UserMethods.loginUser); 

router.post('/signup', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is required').exists(),
], UserMethods.CreateUser); 


router.post('/googleSignIn', UserMethods.googleSignIn);

// Route to fetch all users (for admin or internal use)
router.get('/users', UserMethods.getAllUsers);


module.exports = router;