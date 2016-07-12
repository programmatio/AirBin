'use strict';

const mongoose = require('mongoose');
const config = require('./config');


const options = {
    server: {
        reconnectTries: Number.MAX_VALUE,
        socketOptions: {
            keepAlive: 1
        }
    }
};

module.exports = function(app) {

    mongoose.connect(config.db, options);
    // Cleanup existing connections
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('SIGHUP', cleanup);

    if (app) {
        app.set('mongoose', mongoose);
    }

    return mongoose;
}

function cleanup() {
    mongoose.connection.close(function() {
        console.log('All connection are closing. App is terminated');
        process.exit(0);
    });
}
