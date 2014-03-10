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

var through     = require('through2'),
    gutil       = require('gulp-util'),
    PLUGIN_NAME = '@name@';

module.exports = function () {

    function transform (file, enc, callback) {
        /*jshint validthis:true */

        return callback();
    }

    function finalize (callback) {
        return callback();
    }

    return through.obj(transform, finalize);
};