/**
 * Created by dpitic on 13/01/17.
 * Express application initialisation file. This file is used to bootstrap the
 * Express application using the controller and routing modules.
 */
const config = require('./config'); // Express application configuration files
const express = require('express');
const morgan = require('morgan');   // simple logger middleware
const compress = require('compression');    // response compression
const bodyParser = require('body-parser');  // request data handling middleware
const methodOverride = require('method-override');  // DELETE & PUT legacy
const session = require('express-session'); // Express session module

module.exports = function () {
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

    // Call the routing file with the application instance. The routing file
    // uses the application instance to create a new routing configuration, and
    // then it calls the controller's render() method.
    require('../app/routes/index.server.routes')(app);

    // Call the routing file to access the Users functionality
    require('../app/routes/users.server.routes')(app);

    /* Use the native Express middleware to serve static files from the
     * specified location folder (./public). The express.static() middleware
     * must be placed below the call for the routing file, otherwise Express
     * would try to look for HTTP request paths int he static files folder. This
     * would make the response a lot slower as it would have to wait for file
     * IO operation.
     */
    app.use(express.static('./public'));

    return app;
};