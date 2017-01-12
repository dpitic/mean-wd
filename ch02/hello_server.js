/**
 * Created by dpitic on 12/01/17.
 * Basic 'hello world' web server.
 */

const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello World');
}).listen(3000);

console.log('Server running at http://localhost:3000/');