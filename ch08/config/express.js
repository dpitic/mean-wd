/**
 * Created by dpitic on 13/01/17.
 * Express application initialisation file. This file is used to bootstrap the
 * Express application using the controller and routing modules.
 */
const config = require('./config'); // Express application configuration files
const path = require('path');
const express = require('express');
const morgan = require('morgan');   // simple logger middleware
const compress = require('compression');    // response compression
const bodyParser = require('body-parser');  // request data handling middleware
const methodOverride = require('method-override');  // DELETE & PUT legacy
const session = require('express-session'); // Express session module
const flash = require('connect-flash');     // Temporary messages module
const passport = require('passport');   // Passport authentication middleware

// Define the Express configuration method
module.exports = function () {
    // Create a new Express application instance
    const app = express();

    // process.env is a global variable that provides access to predefined
    // environment variables. The NODE_ENV environment variable is often used
    // for environment-specific configurations.
    if (process.env.NODE_ENV === 'development') {
        // Use the morgan simple logger middleware for development environment
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        // Compress responses for production environment
        app.use(compress());
    }

    // Use the body-parser and method-override middleware functions
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    /* Use Express session middleware. This adds a session object to all request
     * objects in the application. This session object enables you to get or
     * set any property you want to use in the current session.
     */
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    // Configure the Express application view folder and template engine to use
    // the Express template engine ejs.
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    // Register connect-flash module to handle temporary messages
    app.use(flash());

    // Register Passport authentication module middleware in Express application
    app.use(passport.initialize());
    app.use(passport.session());

    // Configure static file serving
    app.use('/', express.static(path.resolve('./public')));
    app.use('/lib', express.static(path.resolve('./node_modules')));

    // Call the routing file to access the Users functionality
    require('../app/routes/users.server.routes')(app);

    // Call the routing file with the application instance. The routing file
    // uses the application instance to create a new routing configuration, and
    // then it calls the controller's render() method.
    require('../app/routes/index.server.routes')(app);

    // Load the routing file for Article resources
    require('../app/routes/articles.server.routes');

    // Return the Express application instance
    return app;
};