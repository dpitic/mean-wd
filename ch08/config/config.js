/**
 * Created by dpitic on 14/01/17.
 * Express application configuration management file. This file loads the
 * correct configuration according to the process.env.NODE_ENV environment
 * variable.
 */
module.exports = require('./env/' + process.env.NODE_ENV + '.js');