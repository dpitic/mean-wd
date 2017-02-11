/**
 * Created by dpitic on 13/01/17.
 * Express supports the routing of requests using either the:
 *      app.route(path).VERB(callback) or
 *      app.VERB(path, callback)
 * methods, where VERB is a lowercase HTTP verb.
 * This script mounts the controller middleware on the root path URL path '/'.
 * This tells Express to execute the function for any HTTP request using the
 * GET verb and which is directed to the root path.
 */

// This script exports a single function using the module.exports pointer. When
// client code loads this module, it can call this anonymous function directly
// using function call operator (). Client code doesn't have to call this
// method as a property of this module (like the case where exports.property is
// used).
module.exports = function (app) {
    const index = require('../controllers/index.server.controller');
    app.get('/', index.render);
};