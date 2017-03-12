/**
 * Created by dpitic on 5/03/17.
 * Express controller for Articles. Responsible for managing Article related
 * functionality on the server side. This provides basic CRUD operations to
 * manipulate the MongoDB Article documents.
 */
// Load the module dependencies
const mongoose = require('mongoose');
const Article = mongoose.model('Article');

/*
 * Error handling controller method for validation and other server errors. This
 * method is used to extract a simple error message from the Mongoose error
 * object and provide it to the controller methods.
 */
const getErrorMessage = function (err) {
    if (err.errors) {
        // Iterate over the error collection and extract the first message
        for (const errName in err.errors) {
            if (err.errors[errName].message) {
                return err.errors[errName].message;
            }
        }
    } else {
        return 'Unknown server error';
    }
};

/*
 * Express controller method used to create a new Article document using the
 * HTTP request body as teh JSON base object fo the document. It uses the model
 * save() method to save it to MongoDB.
 */
exports.create = function (req, res) {
    // Create the new Article object from the request body
    const article = new Article(req.body);
    // Set the Article's creator property to the authenticated User
    article.creator = req.user;
    // Try saving the article
    article.save((err) => {
        if (err) {
            // If an error occurs, send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the article
            res.json(article);
        }
    });
};

/*
 * Express controller method used to read a list of articles. It uses the
 * model's find() method to retrieve all the documents in the article collection
 * and then outputs a JSON representation of the list.
 */
exports.list = function (req, res) {
    // Use the model's find() method to get a list of articles
    Article.find().sort('-created')     // sort using created time property
    // Add some user fields to the creator property
        .populate('creator', 'firstName lastName fullName')
        .exec((err, articles) => {
            if (err) {
                // If an error occurs, send the error message
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                // Send a JSON representation of the article
                res.json(articles);
            }
        });
};

/*
 * Controller middleware that retrieves a single existing article.
 */
exports.articleByID = function (req, res, next, id) {
    // Use the model findById() method to find a single article
    Article.findById(id)
        .populate('creator', 'firstName lastName fullName')
        .exec((err, article) => {
            if (err) {
                return next(err);
            }
            if (!article) {
                return next(new Error('Failed to load article ' + id));
            }

            // If an article is found, use the request object to pass it to the
            // next middleware
            req.article = article;
            // Call the next middleware
            next();
        });
};

/*
 * Express controller method used to read an existing Article document from the
 * database, referenced by the Article ID. Assumes the Article object has
 * already been obtained by articleByID().
 */
exports.read = function (req, res) {
    res.json(req.article);
};

/*
 * Express controller method used to update existing Article documents. This
 * method assumes the Article object has already been obtained by articleByID().
 */
exports.update = function (req, res) {
    // Get the Article from the request object
    const article = req.article;

    // Update the article fields
    article.title = req.body.title;
    article.content = req.body.content;

    // Try saving the updated article
    article.save((err) => {
        if (err) {
            // If an error occurs, send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the article
            res.status(200).json(article);
        }
    });
};

/*
 * Express controller method used to delete an existing Article document. It
 * uses the remove() method to delete the existing article from the database.
 */
exports.delete = function (req, res) {
    // Get the Article from the request object
    const article = req.article;

    // Use the model remove() method to delete the article from the DB
    article.remove((err) => {
        if (err) {
            // If an error occurs, send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the Article
            res.status(200).json(article);
        }
    });
};

/*
 * Express controller middleware used to authorise an Article operation.
 */
exports.hasAuthorisation = function (req, res, next) {
    // If the current user is not the creator of the article, send the
    // appropriate error message
    if (req.article.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorised'
        });
    }

    // Call the next middleware
    next();
};