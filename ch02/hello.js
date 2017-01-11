/**
 * Created by dpitic on 11/01/17.
 * Demonstration of Node's CommonJS module implementation. This script is a
 * simple module. Functionality that should be exposed is done through the
 * exports object.
 */
const message = 'Hello';

/* Expose a function. This is how module functionality is exposed. Everything
else remains hidden. */
exports.sayHello = function () {
    console.log(message);
}