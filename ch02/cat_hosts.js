/**
 * Created by dpitic on 11/01/17.
 * Demonstration of importing a Node core module. Core modules are compiled into
 * the Node binary. They are accessed using the require() method.
 *
 * This script outputs the /etc/hosts file to the console.
 */

const fs = require('fs');

fs.readFile('/etc/hosts', 'utf8', (err, data) => {
    if (err) {
        return console.log(err);
    }

    console.log(data);
});