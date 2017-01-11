/**
 * Created by dpitic on 11/01/17.
 * Simple demonstration of closures. Closures are functions that refer to
 * variables from their outer scope.
 */
function parent() {
    const message = 'Hello World';

    /**
     * This function is a closure. It has access to the message constant which
     * was defined in the outer scope.
     */
    function child() {
        console.log(message);
    }

    child();
}

parent();