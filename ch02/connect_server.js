/**
 * Created by dpitic on 12/01/17.
 * Demonstration of a Connect web server.
 */

const connect = require('../node_modules/connect');
const app = connect();

// Connect middleware functions
function logger(req, res, next) {
    console.log(req.method, req.url);
    next();     // call next registered middleware function
};

function helloWorld(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
};

function goodbyeWorld(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Goodbye World');
};

// Register middleware functions with Connect; execute in this order
app.use(logger);
app.use('/hello', helloWorld);
app.use('/goodbye', goodbyeWorld);

app.listen(3000);

console.log('Server running at http://localhost:3000/');