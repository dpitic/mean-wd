/**
 * Created by dpitic on 17/01/17.
 * Define a set of User related routes that call the controller's methods.
 */

// Get the Users controller
const users = require('../../app/controllers/users.server.controller');
const passport = require('passport');

module.exports = function (app) {

    // Routes to create a new user and get all users
    app.route('/users')
        .post(users.create)
        .get(users.list);       // retrieve document array from users collection

    // Route to get a specific user by userId. In Express, adding a colon before
    // a substring in a route definition means this substring will be handled
    // as a request parameter. The users.*() methods are registered with the
    // userId parameter.
    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

    // Define middleware to be executed before any other middleware that uses
    // the userId parameter. This handles the population of the req.user object.
    // This ensures the users.userByID() method will be executed before any
    // middleware registered with the userId parameter.
    app.param('userId', users.userByID);

    // Define user route for signup
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);

    // Define user route for signin
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));

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

    // Define user route for signout
    app.get('/signout', users.signout);
};