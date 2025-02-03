const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { validationResult } = require('express-validator');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const jwtSecret = process.env.jwtSecretKey;
// const client = new OAuth2Client("process.env.CLIENT_ID");
// const {
//     OAuth2Client,
//   } = require('google-auth-library');
//   const oAuth2Client = new OAuth2Client(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     'postmessage',
//   );
  



const isValidCredentials = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({ errors: "Please enter all fields" });
    }
    if (password.length < 5) {
        return res.status(400).json({ errors: "Password should be of minimum 5 characters" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ errors: "Please enter a valid email" });
    }
    next();
};

// Fetch all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users: users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new user (for credential-based sign-up)
const CreateUser = async (req, res) => {
    try {
        const ifUserExist = await User.findOne({ email: req.body.email });
        if (ifUserExist) {
            return res.status(400).json({ errors: "User already exists" });
        }

        const errors = validationResult(req);
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location,
            pincode: req.body.pincode
        });

        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Login user (for credential-based login)
const loginUser = async (req, res) => {
    let email = req.body.email;
    try {
        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "User with given Email does not exist. Please proceed with signup" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Incorrect Credentials" });
        }

        const payload = { user: { id: userData.id } };
        const authToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' }); 
        return res.json({ success: true, authToken: authToken, data: userData });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};




const googleSignIn = async (req, res) => {
    try {

        const authorizationCode = req.body.code;

        if (!authorizationCode) {
            return res.status(400).json({
                success: false,
                message: "Authorization code is required for Google Sign-In.",
            });
        }

        const tokenResponse = await axios.post("https://oauth2.googleapis.com/token", {
            code: authorizationCode,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: 'postmessage',
            grant_type: 'authorization_code',
        });

        const tokens = tokenResponse.data;
        // console.log("Received tokens:", tokens)/.l;

        if (!tokens.id_token) {
            return res.status(400).json({
                success: false,
                message: "Failed to retrieve ID token from Google.",
            });
        }
        const decodedToken = jwt.decode(tokens.id_token);
        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid ID token.",
            });
        }

        const { name, email, sub: googleId , picture} = decodedToken;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required for Google Sign-In.",
            });
        }

        let userData = await User.findOne({ email });
        if (!userData) {
            userData = await User.create({
                name,
                email,
                googleId,
                picture
            });
            console.log(`New user created: ${email}`);
        } else {
            userData.picture = picture;
            await userData.save();
            console.log(`User found: ${email}`);
        }

        const payload = { user: { id: userData.id } };
        const authToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        return res.status(200).json({
            success: true,
            authToken,
            data: userData,
        });
    } catch (error) {
        console.error("Error during Google Sign-In:", error.message);
        if (error.response && error.response.data) {
            return res.status(400).json({
                success: false,
                message: `Google Sign-In error: ${error.response.data.error_description || "Unknown error"}`,
            });
        }

        return res.status(500).json({
            success: false,
            message: "An error occurred during Google Sign-In.",
        });
    }
};



const UserMethods = {
    CreateUser,
    isValidCredentials,
    loginUser,
    getAllUsers,
    googleSignIn, // Added Google Sign-In method
};


module.exports = UserMethods;