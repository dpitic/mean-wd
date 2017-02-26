/**
 * Created by dpitic on 11/02/17.
 * Passport local authentication module configuration. This file configures the
 * local authentication strategy.
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = function () {
    // Register local authentication strategy
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({
            username: username
        }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }

            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }

            // User is authenticated
            return done(null, user);
        });
    }));
};