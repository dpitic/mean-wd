/**
 * Created by dpitic on 11/03/17.
 * Chat server event handler configuration.
 */
module.exports = function (io, socket) {
    // Emit the status event when a new socket client is connected
    io.emit('chatMessage', {
        type: 'status',
        text: 'connected',
        created: Date.now(),
        username: socket.request.user.username
    });

    // Send a chat message to all connected sockets when a message is received
    socket.on('chatMessage', (message) => {
        message.type = 'message';
        message.created = Date.now();
        message.username = socket.request.user.username;

        // Emit the chatMessage event
        io.emit('chatMessage', message);
    });

    // Emit the status event when a socket client is disconnected
    socket.on('disconnect', () => {
        io.emit('chatMessage', {
            type: 'status',
            text: 'disconnected',
            created: Date.now(),
            username: socket.request.user.username
        });
    });
};