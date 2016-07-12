'use strict';

const fs = require('fs');
const path = require('path')
const express = require('express');
const favicon = require('serve-favicon');
const validator = require('express-validator');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const csrf = require('csurf');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);
const config = require('./config');
const pkg = require('../package.json');
const flash = require('connect-flash');
const env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function(app) {

    // Compression 
    app.use(compression({
        threshold: 512
    }));

    // Static files
    app.use(express.static(config.root + '/public'));

    // Favicon
    app.use(favicon(__dirname + '/../public/favicon.png'));

    // Logging middleware
    if (env !== 'test') {
        var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
            flags: 'a'
        });
        app.use(morgan('combined', {
            stream: accessLogStream
        }));
    }

    // View root directory
    app.set('views', config.root + '/app/views');

    // Rendering engine (Pug - former Jade)
    app.set('view engine', 'pug');

    //Security headers
    app.use(helmet());

    app.use('/assets', express.static(__dirname + '/public/assets'));

    // bodyParser should be above methodOverride
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride(function(req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }));

    // cookieParser should be above session
    app.use(cookieParser());
    app.use(cookieSession({
        secret: 'das2c1aw7dc+97a2'
    }));
    app.use(session({
        secret: pkg.name,
        httpOnly: true,
        proxy: true,
        resave: true,
        maxAge: Date.now() + 365 * 24 * 60 * 60 * 100,
        saveUninitialized: true,
        store: new mongoStore({
            url: config.db,
            collection: 'sessions',
            mongooseConnection: mongoose.connection
        })
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(validator());
    app.use(flash());
    app.use(csrf());
    app.use(function(req, res, next) {

        res.cookie('XSRF-TOKEN', req.csrfToken());
        res.locals.csrftoken = req.csrfToken();
        next();
    });

    // Redirect URL's ending with '/' to the version without '/'
    app.use(function(req, res, next) {
        if (req.url.substr(-1) == '/' && req.url.length > 1) {
            res.redirect(301, req.url.slice(0, -1));
        } else {
            next();
        }
    });

    /** 
     * Map JS and CSS dependencies to the node_modules
     */

    app.use('/js', express.static(__dirname + '/../node_modules/bootstrap/dist/js')); // redirect bootstrap JS
    app.use('/js', express.static(__dirname + '/../node_modules/jquery/dist')); // redirect JS jQuery
    app.use('/css', express.static(__dirname + '/../node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


    // should be declared after session and flash


    // adds CSRF support
    if (process.env.NODE_ENV !== 'test') {
        app.use(csrf());

        // This could be moved to view-helpers :-)
        app.use(function(req, res, next) {
            res.locals.csrf_token = req.csrfToken();
            next();
        });
    }
};
