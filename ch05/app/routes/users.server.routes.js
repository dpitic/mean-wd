/**
 * Created by dpitic on 17/01/17.
 * Define a set of User related routes that call the controller's methods.
 */
const users = require('../../app/controllers/users.server.controller');

module.exports = function (app) {
    app.route('/users')
        .post(users.create)
        .get(users.list);       // retrieve document array from users collection
};