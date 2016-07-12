'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

module.exports = function () {

    router.get('/', function (req, res) {
        res.json({
            msg: 'API is running'
        });
    });
    return router;
};
