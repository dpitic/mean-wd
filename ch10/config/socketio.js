/**
 * Created by dpitic on 10/03/17.
 * Socket.io configuration.
 */
// Load module dependencies
const config = require('./config');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const configureChat = require('../app/controllers/chat.server.controller');

// Define the Socket.io configuration method
module.exports = function (server, io, mongoStore) {
    // Intercept Socket.io handshake request
    io.use((socket, next) => {
        // Use the cookie-parser module to parse the request cookies
        cookieParser(config.sessionSecret)(socket.request, {}, (err) => {
            // Get the session id from the request cookies
            const sessionId = socket.request.signedCookies['connect.sid'];

            // Use the mongoStorage instance to get the Express session info.
            mongoStore.get(sessionId, (err, session) => {
                // Set the Socket.io session information
                socket.request.session = session;

                // Use Passport to populate the user details
                passport.initialize()(socket.request, {}, () => {
                    passport.session()(socket.request, {}, () => {
                        if (socket.request.user) {
                            // User is authenticated; continue with socket
                            // initialisation
                            next(null, true);
                        } else {
                            next(new Error('User is not authenticated'), false);
                        }
                    });
                });
            });
        });
    });

    // Add an event listener to the connection event
    io.on('connection', (socket) => {
        // Load the chat controller
        configureChat(io, socket);
    });
};