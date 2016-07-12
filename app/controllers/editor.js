'use strict';

const hljs = require('highlight.js');
const config = require('../../config/config.js');
const mongoose = require('mongoose');

/**
 * Editor
 */

exports.get = function(req, res, next) {

    var languages = hljs.listLanguages();
    res.render('editor.pug',

        {
            message: "Error",
            languages: languages,
            csrfToken: req.csrfToken()
        });
};
