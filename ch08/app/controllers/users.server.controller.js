/**
 * Created by dpitic on 17/01/17.
 * Controller file is used to handle user related operations on the User model.
 * To be able to call these methods and use them, routes have to be added (in
 * the app/routes folder).
 */

// Get the Mongoose User model
const User = require('mongoose').model('User');
const passport = require('passport');

/*
 * Create new User. This code defines a new controller method called create()
 * which is used to create a new model instance populated using the request
 * body.
 */
exports.create = function (req, res, next) {
    // Create a new User model instance populated using request body
    const user = new User(req.body);

    // Save the User model and output the User object
    user.save((err) => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(user);
        }
    });
};

/*
 * Return a list of User objects from the User model
 */
exports.list = function (req, res, next) {
    // find() is a model method that retrieves multiple documents stored in the
    // same collection using a query and is a Mongoose implementation of the
    // MongoDB find() collection method.
    User.find({}, (err, users) => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(users);
        }
    });
};

/*
 * Return a single user document. The req.user object is created by the
 * userByID() method below.
 */
exports.read = function (req, res) {
    res.json(req.user);
};

/*
 * Middleware for dealing with manipulation of single documents when performing
 * read, delete and update operations.
 */
exports.userByID = function (req, res, next, id) {
    User.findOne({
        _id: id
    }, (err, user) => {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

/*
 * Middleware for updating a user by userId. Uses the userById() method to
 * populate the req.user object for the particular userId to update.
 */
exports.update = function (req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, {
        'new': true
    }, (err, user) => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(user);
        }
    });
};

/*
 * Middleware for removing an existing User document. Uses the userByID() method
 * to populate the req.user object for the particular userId to delete.
 */
exports.delete = function (req, res, next) {
    req.user.remove(err => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(req.user);
        }
    });
};

/*
 * Error handling controller method. Returns a unified error from a Mongoose
 * error object. There are two possible errors: a MongoDB indexing error handled
 * using the error code, and a Mongoose validation error handled using the
 * err.errors object.
 */
function getErrorMessage(err) {
    let message = '';     // Error message variable

    // If an internal MongoDB error occurs, get the error message
    if (err.code) {
        switch (err.code) {
            // If a unique index error occurs, set the message error
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            // If a general error occurs, set the message error
            default:
                message = 'Something went wrong';
        }
    } else {
        // Grab the first error message from a list of possible errors
        for (const errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }

    // Return the message error
    return message;
};

/*
 * Controller method that signs in users
 */
exports.signin = function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err || !user) {
            res.status(400).send(info);
        } else {
            // Remove sensitive data before login
            user.password = undefined;
            user.salt = undefined;

            // Use the Passport login() method to log in
            req.login(user, (err) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(user);
                }
            });
        }
    })(req, res, next);
}

/*
 * Controller method used to render the signin page.
 */
exports.renderSignin = function (req, res, next) {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

/*
 * Controller method used to render the signup page.
 */
exports.renderSignup = function (req, res, next) {
    // If user is not connected, render the signup page, otherwise redirect user
    // back to main application page.
    if (!req.user) {
        res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

/*
 * Controller method used to create regular users.
 */
exports.signup = function (req, res, next) {
    // If user is not connected, create and login a new user, otherwise redirect
    // user back to the main application page.
    if (!req.user) {
        // Create a new User model instance
        const user = new User(req.body);
        // Set the user provider property to local authentication strategy
        user.provider = 'local';

        // Try saving the new user document
        user.save((err) => {
            // If an error occurs, use flash messages to report the error
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                // Remove sensitive data before login
                user.password = undefined;
                user.salt = undefined;

                // Login the user

                req.login(user, function (err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        });
    }
};

/*
 * Controller method used to create a new OAuth user.
 */
exports.saveOAuthUserProfile = function (req, profile, done) {
    // Try finding a user document that was registered using the current OAuth
    // provider.
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, (err, user) => {
        // If an error occurs, continue to the next middlware
        if (err) {
            return done(err);
        } else {
            // If a user could not be found, create a new user, otherwise
            // continue to the next middleware.
            if (!user) {
                // Set a possible username
                const possibleUsername = profile.username || ((profile.email)
                        ? profile.email.split('@')[0] : '');

                // Find a unique available username
                User.findUniqueUsername(possibleUsername, null,
                    (availableUsername) => {
                        // Set the available user name
                        profile.username = availableUsername;

                        // Create the user
                        user = new User(profile);

                        // Try saving the new user document
                        user.save((err) => {
                            // Continue to the next middleware
                            return done(err, user);
                        });
                    });
            } else {
                // Found existing user profile, continue to the next middleware
                return done(err, user);
            }
        }
    });
};

/*
 * Controller method for signing out
 */
exports.signout = function (req, res) {
    // Use the Passport logout() method to log out
    req.logout();       // Invalidate the authenticated session

    // Redirect user back to the main application page
    res.redirect('/');
};