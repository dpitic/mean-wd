/**
 * Created by dpitic on 17/01/17.
 * Controller file is used to handle user related operations on the User model.
 */
const User = require('mongoose').model('User');

/*
 * Create new User.
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