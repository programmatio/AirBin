'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

/**
 * User Schema
 */

const UserSchema = new Schema({
    username: {
        type: String,
        index: true
    },
    local: {
        password: String,
        email: String
    }
});

/**
 * Generate Hash
 */

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

//Compile model and expose
module.exports = mongoose.model('User', UserSchema);
