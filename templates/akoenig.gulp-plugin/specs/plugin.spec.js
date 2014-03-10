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

var fs         = require('fs'),
    yourPlugin = require('../'),
    gutil      = require('gulp-util');

describe('The "@name@" plugin', function () {

    it('should ...', function (done) {
        var strom = yourPlugin();

        strom.on('data', function (css) {
            done();
        });

        //strom.write();
        strom.end();

        done();
    });
});