/**
 * Created by dpitic on 17/01/17.
 * Mongoose configuration file. Mongoose is a Node.js module that enables
 * developers to model objects and save them as MongoDB documents. It provides
 * the opportunity to use both strict and loose schema approaches.
 */
const config = require('./config');
const mongoose = require('mongoose');

// Connect to MongoDB database specified in ./config/eng/
module.exports = function () {
    const db = mongoose.connect(config.db);
    
    // Register the User model
    require('../app/models/user.server.model');
    
    return db;
};