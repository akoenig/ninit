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

var express = require('express');
var api = require('./api');
var server;

require('express-namespace');

/**
 * Boot the server.
 *
 * @param {object} config see config/*
 *
 */
exports.boot = function boot (config, callback) {
    var app = express();

    app.disable('x-powered-by');
    app.use(app.router);

    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.cookieParser());

    //
    // Set the /api namespace
    app.namespace('/api', function onNamespace () {
        api.boot(app, config);
    });

    server = app.listen(config.env.port, config.env.host, callback);
};

/**
 * Shutdown the server.
 *
 */
exports.halt = function halt (callback) {
    server.close(callback);
};