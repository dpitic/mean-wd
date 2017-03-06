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
    // Create the new Article object
    const article = new Article(req.body);
    // Set the Article's creator property to the User from the request
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

