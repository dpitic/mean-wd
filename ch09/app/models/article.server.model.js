/**
 * Created by dpitic on 5/03/17.
 * Mongoose model file for the Article entity.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
 * Article schema definition used to define the Article model.
 */
const ArticleSchema = new Schema({
    // Represents the time at which the article was created
    created: {
        type: Date,
        default: Date.now
    },
    // Article title; required field.
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    // Article content
    content: {
        type: String,
        default: '',
        trim: true
    },
    // Reference to object that represents the User who created the article
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

// Create the Article model out of the ArticleSchema
mongoose.model('Article', ArticleSchema);