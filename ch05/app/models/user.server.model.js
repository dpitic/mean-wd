/**
 * Created by dpitic on 17/01/17.
 * This file contains the definition of the MongoDB document schema. The schema
 * defined here is for the User entity. The schema is used to define the model
 * for the User entity.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Mongoose schema
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String        // clear text!
});

// Define model; must be registered in config/mongoose.js before it can be used
mongoose.model('User', UserSchema);