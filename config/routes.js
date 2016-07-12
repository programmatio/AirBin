'use strict';

const express = require('express');
const mongoose = require('mongoose');
const db = mongoose.connection;
const passport = require('passport');

const serverErrorHandler = require('../app/middleware/serverErrorHandler');
const locationErrorHandler = require('../app/middleware/locationErrorHandler');

const index = require('../app/routes/index');
const api = require('../app/routes/api');

/** 
 * Load middleware
 */

module.exports = function(app) {

    app.use(function(req, res, next) {
        if (req.isAuthenticated()) {
            res.locals.username = req.user.username;
            res.locals.id = req.user._id;
            res.locals.email = req.user.local.email;
        }
        next();
    });

    app.use('/', index(app));
    app.use('/api', api(app));


    /** 
     * Error handling
     */
    // app.use(serverErrorHandler);
    app.use(locationErrorHandler);
};
