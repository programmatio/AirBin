'use strict';

const config = require('../../config/config.js');
const mongoose = require('mongoose');
const User = require('../models/user');
const Snippet = mongoose.model('Snippet');
const passport = require('passport');
const bcrypt = require('bcrypt');

/**
 * Homepage
 */

exports.signup = function(req, res, next) {
    res.render('register.pug', {
        message: "Error",
        csrfToken: req.csrfToken()
    });
};

exports.login = function(req, res, next) {
    res.render('login.pug', {
        message: "Error",
        csrfToken: req.csrfToken()
    });
};

exports.validateSignup = function(req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var passwordConfirm = req.body.password_confirm;

    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty().isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password_confirm', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        res.render('register.pug', {
            errors: errors,
            csrfToken: req.csrfToken()
        });
    } else {
        next();
    }
};

exports.destroy = function(req, res, next) {
    if (req.isAuthenticated()) {
        User.find({

            _id: req.user._id
        }).remove(function(err) {
            if (err) {
                return next(err);
            }

        }).exec();
        req.flash('success_msg', 'User has been removed');
        req.logout();
        res.redirect('/');

    } else {
        next();
    }
};
