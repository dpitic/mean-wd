/**
 * Created by dpitic on 14/01/17.
 * Development environment configuration file.
 */

// Load the secret credentials
const credentials = require('../../secrets/credentials');

module.exports = {
    // Express session module uses a cookie stored, signed session identifier
    // to identify the current user. The session identifier is signed with a
    // secret string defined here. For security reasons, it is recommended that
    // the cookie secret is different for each environment.
    sessionSecret: 'developmentSessionSecret',

    // MongoDB connection string
    db: 'mongodb://localhost/mean-book',

    // Facebook OAuth
    facebook: {
        clientID: credentials.facebook.clientID,
        clientSecret: credentials.facebook.clientSecret,
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    // Twitter OAuth
    twitter: {
        clientID: credentials.twitter.clientID,
        clientSecret: credentials.twitter.clientSecret,
        callbackURL: 'http://localhost:3000/oauth/twitter/callback'
    },
    // Google OAuth
    google: {
        clientID: credentials.google.clientID,
        clientSecret: credentials.google.clientSecret,
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    }
};