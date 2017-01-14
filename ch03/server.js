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

const configureExpress = require('./config/express');

const app = configureExpress();
app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000/');
