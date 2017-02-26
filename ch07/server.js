/**
 * Created by dpitic on 13/01/17.
 * This is the main Express application file. It uses the Express configuration
 * module to retrieve the app object instance which it sets to listen for HTTP
 * requests on port 3000.
 */

// Define Node environment variables.
// This line sets the default value to 'development' if it hasn't already been
// defined.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the Mongoose configuration early so any module loaded after will be able
// to use the Model without having to load it itself.
const configureMongoose = require('./config/mongoose');
const configureExpress = require('./config/express');
const configurePassport = require('./config/passport');

// Load the Mongoose configuration before any other configuration to ensure the
// models are usable by any other modules loaded subsequently without each
// module having to load the models individually.
const db = configureMongoose();
const app = configureExpress();
const passport = configurePassport();
app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000/');
