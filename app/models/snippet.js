'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Snippet Schema
 */

const SnippetSchema = new Schema({
    url: {
        type: String,
        // index: true,
        required: [true, 'Has to have an address'],
    },
    name: String,
    privacy: {
        default: false,
        type: Boolean
    },
    language: String,
    contents: String,
    owner: {
        type: String,
        default: 'guest'
    },
    createdAt: { type: Date, default: Date.now },// Set time of creation to current time on the server
    expireAt: { type: Date, default: undefined } // Set default expiration time to undefined

});
SnippetSchema.index({ "expireAt": 1 }, { expireAfterSeconds : 0});

//Compile model and expose
module.exports = mongoose.model('Snippet', SnippetSchema);
