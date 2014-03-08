/*
 * @name@
 *
 * Copyright(c) 2014 @your name@ <@your email address@>
 * MIT Licensed
 *
 */

/**
 * @author @your name@ <@your email address@>
 *
 */

'use strict';

var Users = require('./users');

exports.boot = function boot (app, config) {

    // /api/users
    app.namespace('/users', function () {
        Users.init(app, config);
    });

};