/**
 * Created by dpitic on 13/01/17.
 */
module.exports = function (app) {
    const index = require('../controllers/index.server.controller');
    app.get('/', index.render);
};