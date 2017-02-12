/**
 * Created by dpitic on 17/01/17.
 * This file contains the definition of the MongoDB document schema. The schema
 * defined here is for the User entity. The schema is used to define the model
 * for the User entity.
 */
const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

// Define Mongoose schema object for the User schema
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,            // Secondary index on email
        // Predefined validator for regex to validate email format
        match: [/.+@.+\..+/, "Please fill a valid e-mail address"]
    },
    username: {                 // Predefined modifier to manipulate data before
        type: String,           // saving document.
        trim: true,             // Clear leading and trailing whitespace
        unique: true,           // Create unique index for username
        // Predefined validator for field existence
        required: "Username is required"
    },
    password: {
        type: String,           // Salted and hashed before being persisted
        // Custom validator for password existence and length
        validate: [(password) => {
            return password && password.length >= 6;
        }, 'Password should be longer']     // error message
    },
    salt: {                     // Password salt property used to hash passwords
        type: String
    },
    provider: {                 // Strategy used to register a user
        type: String,
        // Predefined validator for provider value existence
        required: 'Provider is required'
    },
    // Indicate the user identifier for the authentication strategy
    providerId: String,
    // Property used to store the user object retrieved from OAuth providers
    providerData: {},
    created: {                  // Added document creation date
        type: Date,
        default: Date.now       // Default document creation date
    }
    // This code was demonstration code from chapter 5; not required here.
    // role: {                     // enum predefined validator for role type
    //     type: String,
    //     enum: ['Admin', 'Owner', 'User']
    // },
    // website: {                  // Custom getter modifier to handle data
    //     type: String,           // manipulation before returning the document.
    //     get: function (url) {   // Ensure website field begins with http:// or
    //         if (!url) {         // https:// when the document is returned.
    //             return url;
    //         } else {
    //             if (url.indexOf('http://') !== 0 &&
    //                 url.indexOf('https://') !== 0) {
    //                 url = 'http://' + url;
    //             }
    //
    //             return url;
    //         }
    //     }
    // }
});

/*
 * Add a full name virtual attribute, with getter & setter,  which represents
 * the concatenation of the user's first and last names.
 */
UserSchema.virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.lastName;
    })
    .set(function (fullName) {
        const splitName = fullName.split(' ');
        this.firstName = splitName[0] || '';
        this.lastName = splitName[1] || '';
    });

/*
 * Mongoose pre middleware to hash password before saving document
 */
UserSchema.pre('save', function (next) {
    if (this.password) {
        // Create auto-generated pseudo-random hashing salt
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),
            'base64');
        // Hash the password using custom instance method
        this.password = this.hashPassword(this.password);
    }
    next();
});

/*
 * Define custom instance method to hash user password
 */
UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt,
        10000,      // iterations
        64)         // key length
        .toString('base64');
};

/*
 * Define a custom instance method to validate a user's password to authenticate
 * the user. This method accepts a password string, hashes it, and compares it
 * to the current user's hashed password.
 */
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

/*
 * Define custom model static method to perform model-level operation to find
 * possible unique username which is available for a new user. This is used with
 * OAuth authentication.
 */
UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    // Add a username suffix
    const possibleUsername = username + (suffix || '');

    // User the User model findOne() method to find an available unique username
    this.findOne({
        username: possibleUsername
    }, (err, user) => {
        // If an error occurs, call the callback with a null value, otherwise
        // find an available unique username
        if (!err) {
            // If an available unique username was found, call the callback
            // method, otherwise call the findUniqueUsername() method again with
            // a new suffix.
            if (!user) {
                callback(possibleUsername);
            } else {
                return this.findUniqueUsername(username, (suffix || 0) + 1,
                    callback);
            }
        } else {
            callback(null);
        }
    });
};

/*
 * Configure schema to force Mongoose to include getters when converting the
 * MongoDB document to JSON representation to allow output of documents using
 * res.json()
 */
UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

/*
 * Define custom model static method to perform model-level operation to find
 * a user document by searching on username.
 */
// This code was left over demonstration code from Chapter 5; not required here.
// UserSchema.statics.findOneByUsername = function (username, callback) {
//     this.findOne({username: new RegExp(username, 'i')}, callback);
// };

/*
 * Mongoose post middleware used to intercept save function and log output
 * after the document has been saved.
 */
UserSchema.post('save', function (next) {
    console.log('The user "' + this.username + '" details were saved.');
});

/*
 * Define model; must be registered in config/mongoose.js before it can be used
 * This model definition uses the User schema object defined above.
 */
mongoose.model('User', UserSchema);