'use strict';

const passport = require('passport');
const express = require('express');
const editorCtrl = require('../controllers/editor');
const userCtrl = require('../controllers/user');
const snippetCtrl = require('../controllers/snippet');
const auth = require('../middleware/auth');
const router = express.Router();

module.exports = function() {

    router.use(snippetCtrl.latest);

    /** 
     * Registration post form
     */

    router.get('/signup', function(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/profile');
        }
        return next();

    }, userCtrl.signup);

    /** 
     * Registration post form
     */

    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages

    }));

    /** 
     * Login page
     */

    router.get('/login', function(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/profile');
        }
        return next();

    }, userCtrl.login);

    /** 
     * Login post login form
     */

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    // Logout

    router.get('/logout', auth.isAuthorized, auth.logout);

    // Destroy user

    router.get('/destroy', auth.isAuthorized, userCtrl.destroy);


    // Profile page

    router.get('/profile', auth.isAuthorized, function(req, res, next) {

        res.render('profile.pug');

    });

    // View current users sniuppets

    router.get('/snippets', auth.isAuthorized, snippetCtrl.viewMySnippets);

    // View specific snippet

    router.get('/:url', snippetCtrl.view);

    // View Homepage

    router.get('/', editorCtrl.get);

    router.post('/', snippetCtrl.publishSnippet);

    return router;
};
