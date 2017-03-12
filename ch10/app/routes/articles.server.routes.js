/**
 * Created by dpitic on 6/03/17.
 * Express routes configuration for Article resources CRUD operations.
 */
const users = require('../../app/controllers/users.server.controller');
const articles = require('../../app/controllers/articles.server.controller');

module.exports = function (app) {
    app.route('/api/articles')
        .get(articles.list)
        .post(users.requiresLogin, articles.create);

    app.route('/api/articles/:articleId')
        .get(articles.read)
        .put(users.requiresLogin, articles.hasAuthorisation, articles.update)
        .delete(users.requiresLogin, articles.hasAuthorisation,
            articles.delete);

    // Register the route parameter for Article ID
    app.param('articleId', articles.articleByID);
};