const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/config.js');
const app = express();
const port = process.env.PORT || 8080;

// Bootstrap mongoose
fs.readdirSync(__dirname + '/app/models').forEach(function(file) {
    if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap application settings
require('./config/mongoose')(app);
require('./config/passport')(app);
require('./config/express.js')(app);

// Bootstrap routes
require('./config/routes')(app);

// Start the app
app.listen(port);
console.log('App started on port ' + port);
