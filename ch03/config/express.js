/**
 * Created by dpitic on 13/01/17.
 */
const express = require('express');

module.exports = function () {
    const app = express();
    require('../app/routes/index.server.routes')(app);
    return app;
};