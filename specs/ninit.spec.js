/*
 * ninit - node module bootstrapper
 *
 * Copyright(c) 2014 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@posteo.de>
 *
 */

'use strict';

var fs   = require('fs'),
    path = require('path'),
    ninit  = require('../');

describe('The "ninit" generate', function () {

    var options = {
        name: 'foo'
    };

    it('should fail if no parameters has been passed', function (done) {
        ninit.generate().once('error', function (err) {
            expect(err).toBeDefined();
            expect(err.toString()).toBe('Error: Please define the @name@ attribute.');

            done();
        });
    });

    it('should fail if the template does not exist', function (done) {
        ninit.generate('foooo', options).once('error', function (err) {
            expect(err).toBeDefined();
            expect(err.toString()).toBe('Error: The specified template does not exist.');

            done();
        });
    });

    it('should be able to generate a module by a specific template', function (done) {
        ninit.generate('akoenig.library', options, __dirname)
            .once('done', function () {
                var dest = path.join(__dirname, options.name);

                expect(fs.existsSync(dest)).toBe(true);
                expect(require(path.join(dest, 'package.json')).name).toBe(options.name);

                done();
            });
    });
});