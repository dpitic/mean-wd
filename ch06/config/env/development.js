/**
 * Created by dpitic on 14/01/17.
 * Development environment configuration file.
 */
module.exports = {
    // Express session module uses a cookie stored, signed session identifier
    // to identify the current user. The session identifier is signed with a
    // secret string defined here. For security reasons, it is recommended that
    // the cookie secret is different for each environment.
    sessionSecret: 'developmentSessionSecret',

    // MongoDB connection string
    db: 'mongodb://localhost/mean-book'
};