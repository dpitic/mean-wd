/**
 * Created by dpitic on 11/02/17.
 * Passport authentication module configuration.
 */
const passport = require('passport');
const mongoose = require('mongoose');

module.exports = function () {
    const User = mongoose.model('User');

    /*
     * When a user is authenticated, Passport will save its _id property to the
     * session. When the user object is needed later, Passport will use the _id
     * property to obtain the user object from the database.
     */

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({
            _id: id
        }, '-password -salt', (err, user) => {  // Don't fetch password & salt
            done(err, user);
        });
    });

    // Load the local authentication strategy configuration
    require('./strategies/local')();
};
