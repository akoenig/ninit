/*
 * nmg - node module generator
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

var path      = require('path'),
    Generator = require('./lib').Generator;

/**
 * Generates a module by a given template name and specification
 *
 * @param {string} templateName The name of the template from which a new module should be generated.
 * @param {object} specification The mapping between tokens in the `package.json` and actual values.
 * @param {string} where The destination path in which the module should be generated (optional; default process.cwd())
 *
 * @return {EventEmitter} Events: error, done
 *
 */
exports.generate = function generate (templateName, specification, where) {
    specification = specification || {};

    if (!where) {
        where = process.cwd();
    }

    return Generator.create({
        templatesPath: path.join(__dirname, 'templates'),
        templateName: templateName,
        specification: specification,
        destination: where
    });
};