/**
 * Created by dpitic on 13/01/17.
 * This is an Express controller. It is implemented using the CommonJS module
 * pattern to define a function named render(). This function is exported so
 * that it can be used in other parts of the application. This function
 * implements a middleware used to process the response. An Express routing
 * functionality is required to utilise the controller.
 */

// This script exports an anonymous function by defining it as a property of the
// exports object. When client code loads this module using require(), it can
// call the exported method using dot notation to reference the method as a
// property of this module.
exports.render = function (req, res) {
    // Output the last visit date to the console
    // if (req.session.lastVisit) {
    //     console.log(req.session.lastVisit);
    // }
    //
    // // Record the time of the last user request
    // req.session.lastVisit = new Date();

    // Set the safe user object
    const user = (!req.user) ? null : {
            _id: req.user.id,
            firstName: req.user.firstName,
            lastName: req.user.lastName
        };

    // Use the EJS template engine to render the response. EJS template engine
    // looks for files in the views folder as set in config/express.js file.
    // EJS renders the HTML on the server. MEAN applications mostly render
    // HTML on the client side using Angular.
    res.render('index', {       // name of EJS template file
        title: 'Hello World',   // object containing template variables.
        user: JSON.stringify(user)
    });
};