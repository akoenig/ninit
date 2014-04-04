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

var yourPlugin = require('../');
var gutil = require('gulp-util');

describe('The "@name@" plugin', function () {

    it('should ...', function (done) {
        var strom = yourPlugin();

        strom.on('data', function (chunk) {
            done();
        });

        //strom.write();
        strom.end();

        done();
    });
});
