/**
 * Created by dpitic on 11/01/17.
 * Demonstration of closures.
 */
function parent() {
    const message = 'Hello World';

    function child() {
        console.log(message);
    }

    return child;
}

const childFN = parent();
/* Create a closure object, which consists of the child() function and the
   scope it was created in. */
childFN();