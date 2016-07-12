'use strict';

const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../app/models/user');


module.exports = function(app) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    require('./strategies/local').init();

};
