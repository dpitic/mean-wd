/**
 * Created by dpitic on 17/01/17.
 * This file contains the definition of the MongoDB document schema. The schema
 * defined here is for the User entity. The schema is used to define the model
 * for the User entity.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Mongoose schema object for the User schema
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,            // Secondary index on email
        match: /.+@.+\..+/      // Predefined validator for regex
    },
    username: {                 // Predefined modifier to manipulate data before
        type: String,           // saving document.
        trim: true,             // Clear leading and trailing whitespace
        unique: true,           // Create unique index for username
        required: true          // Predefined validator for field existence
    },
    password: {
        type: String,           // clear text!
        validate: [             // Custom validator for password length
            function (password) {
                return password.length >= 6;
            },
            'Password should be longer'     // error message
        ]
    },
    created: {                  // Added document creation date
        type: Date,
        default: Date.now       // Default document creation date
    },
    role: {                     // enum predefined validator for role type
        type: String,
        enum: [ 'Admin', 'Owner', 'User' ]
    },
    website: {                  // Custom getter modifier to handle data
        type: String,           // manipulation before returning the document.
        get: function (url) {   // Ensure website field begins with http:// or
            if (!url) {         // https:// when the document is returned.
                return url;
            } else {
                if (url.indexOf('http://') !== 0 &&
                    url.indexOf('https://') !== 0) {
                    url = 'http://' + url;
                }

                return url;
            }
        }
    }
});

// Add a full name virtual attribute, with getter & setter,  which represents
// the concatenation of the user's first and last names.
UserSchema.virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.lastName;
    })
    .set(function (fullName) {
        const splitName = fullName.split(' ');
        this.firstName = splitName[0] || '';
        this.lastName = splitName[1] || '';
});

// Configure schema to force Mongoose to include getters when converting the
// MongoDB document to JSON representation to allow output of documents using
// res.json()
UserSchema.set('toJSON', { getters: true, virtuals: true });

/*
 * Define custom model static method to perform model-level operation to find
 * a user document by searching on username.
 */
UserSchema.statics.findOneByUsername = function (username, callback) {
    this.findOne({ username: new RegExp(username, 'i') }, callback);
};

// Define a custom instance method to validate a user's password.
UserSchema.methods.authenticate = function (password) {
    return this.password === password;
};

// Mongoose post middleware used to intercept save function and log output
// after the document has been saved.
UserSchema.post('save', function (next) {
    console.log('The user "' + this.username + '" details were saved.');
});

// Define model; must be registered in config/mongoose.js before it can be used
// This model definition uses the User schema object defined above.
mongoose.model('User', UserSchema);