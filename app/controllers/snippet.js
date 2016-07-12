'use strict';

const mongoose = require('mongoose');
const Snippet = mongoose.model('Snippet');
const shortid = require('shortid');
const timeHelper = require('../helpers/time');
const validator = require('express-validator');

exports.view = function(req, res, next) {
    console.log(req.params.url);
    Snippet.find({
        url: req.params.url
    }, function(err, results) {
        if (err) {
            return next(err);
        }
        if (results.length) {
            var result = results[0];
            res.render('snippet.pug', {
                url: result.url,
                language: result.language,
                contents: result.contents,
                privacy: result.privacy,
                name: result.name,
                // owner: result.user.id,
                date: result.createdAt,
                dateExpiry: result.expireAt,
                csrfToken: req.csrfToken()
            });
        } else {
            next();
        }

    });
};


exports.latest = function(req, res, next) {

    Snippet.find({}).sort('-date').exec(function(err, docs) {
        if (err) {
            return next(err);
        }
        if (docs.length) {
            console.log(docs);
            res.locals.snippets = docs;
        }
        next();

    });
};

/**
 * Publish
 */

exports.publishSnippet = function(req, res, next) {

    function getUniqueName() {
        Snippet.find({
            url: url
        }, function(err, result) {
            if (err) {
                return next(err);
            }
            if (!result.length) {
                return;
            } else {
                url = shortid.generate();
                getUniqueName();
            }
        });
    }
    var url = shortid.generate();
    var language = req.body.language;
    var name = req.body.name;
    var privacy = req.body.privacy;
    var contents = req.body.contents;
    var currentTime = Date.now();
    var owner;
    var dateExpiry = undefined;
    if (req.user) {
        owner = req.user._id;
    } else {
        owner = 'guest';
    }
    if (timeHelper[req.body.dateExpiry]) {
        dateExpiry = timeHelper[req.body.dateExpiry] + Date.now();
    }

    getUniqueName(url);
    req.checkBody('url', 'Name is required').notEmpty();
    var snippet = new Snippet({
        url: url,
        language: language,
        name: name,
        owner: owner,
        contents: contents,
        privacy: privacy,
        expireAt: dateExpiry
    });
    console.log(snippet);
    snippet.save(function(err) {
        // we've saved the dog into the db here
        if (err) {
            return next(err);
        }
        res.redirect('/' + url);
    });
};

exports.viewSnippet = function(req, res, next) {
    Snippet.find({
        url: req.params.url
    }, function(err, result) {
        if (err) {
            return next(err);
        }
        if (result.length) {
            res.render('snippet.pug', {
                url: result.snippet,
            });
        } else {
            next();
        }
    });
};

exports.viewMySnippets = function(req, res, next) {
    Snippet.find({
        owner: req.user._id
    }, function(err, result) {
        if (err) {
            return next(err);
        }
        if (result.length) {
            res.render('my-snippets.pug', {
                mySnippets: result,
            });
        } else {
            next();
        }
    });
};
