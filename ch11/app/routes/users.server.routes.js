/**
 * Created by dpitic on 17/01/17.
 * Define a set of User related routes that call the controller's methods.
 */

// Get the Users controller
const users = require('../../app/controllers/users.server.controller');
const passport = require('passport');

module.exports = function (app) {
    // Set up the signup routes
    app.route('/api/auth/signup').post(users.signup);

    // Set up the signin routes
    app.route('/api/auth/signin').post(users.signin);

    // Set up the signout route
    app.route('/api/auth/signout').get(users.signout);

    // Define Facebook OAuth route to start user authentication process
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }));
    // Define Facebook OAuth route to finish authentication process when the
    // user has linked their Facebook profile.
    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));

    // Define Twitter OAuth route
    app.get('/oauth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }));
    // Define Twitter OAuth route to finish authentication process
    app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));

    // Define Google OAuth route
    app.get('/oauth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }));
    // Define Google OAuth route to finish authentication process
    app.get('/oauth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));
};