/*
 * test
 *
 * Copyright(c) 2014 ad <fsd>
 * MIT Licensed
 *
 */

/**
 * @author ad <fsd>
 *
 */

'use strict';

var http = require('http');
var app = require('../app');
var config = {
    env: require('../config/environment.json')
};

exports.config = config;

/**
 * Returns the API endpoint.
 *
 * @return {string} The API endpoint
 *
 */
exports.getEndpoint = function getEndpoint () {
    return 'http://' + config.env.host + ':' + config.env.port;
};

/**
 * Starts the API.
 *
 */
exports.start = function start (callback) {
    app.boot(config, callback);
};

/**
 * Stops the API.
 *
 */
exports.stop = function stop (callback) {
    app.halt(callback);
};

/**
 * HTTP GET request wrapper.
 *
 */
exports.GET = function GET (endpoint, callback) {
    http.get(endpoint, function (res) {
        var body = '';

        res
            .on('data', function (chunk) {
                body = body + chunk;
            })
            .on('end', function () {
                return callback(null, res.statusCode, body);
            });
    });
};