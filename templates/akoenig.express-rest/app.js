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

var path = require('path');
var app = require('./app/');
var pkg = require('./package.json');
var config = {
    env: require(path.join(__dirname, 'config', 'environment.json'))
};

function onBoot (err) {
    if (err) {
        return console.error(err);
    }

    console.log('%s is running (%s:%d)', pkg.name, config.env.host, config.env.port);
}


if (require.main === module) {
    app.boot(config, onBoot);
} else {
    // Exports for testing.
    module.exports = app;
}