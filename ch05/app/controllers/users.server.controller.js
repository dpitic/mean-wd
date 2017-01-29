/**
 * Created by dpitic on 17/01/17.
 * Controller file is used to handle user related operations on the User model.
 * To be able to call these methods and use them, routes have to be added (in
 * the app/routes folder).
 */

// Get the Mongoose User model
const User = require('mongoose').model('User');

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