const  mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: false // Optional, only used for credential-based authentication
    },
    email: {
      type: String,
      required: true,
      unique: true // Ensure unique email
    },
    googleId: {
      type: String,
      required: false // Optional, used for Google Sign-In
    },
    location: {
      type: String,
      required: false
    },
    pincode: {
      type: String,
      required: false
    },
    picture: {
      type: String,
      required: false
    },
    date: {
      type: Date,
      default: Date.now
    },
    jwtToken: {
      type: String,
      required: false // This will store the JWT, if needed to store in the DB
    }
  });
  
module.exports = mongoose.model('Users' , UserSchema)




