/**
 * Created by dpitic on 17/01/17.
 * Define a set of User related routes that call the controller's methods.
 */

// Get the Users controller
const users = require('../../app/controllers/users.server.controller');

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
};