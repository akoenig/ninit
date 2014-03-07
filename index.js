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
 * DOCME
 *
 * @param  {[type]} templateName [description]
 * @param  {[type]} options      [description]
 * @return {[type]}              [description]
 *
 */
exports.generate = function generate (templateName, specification, where) {
    specification = specification || {};

    if (!where) {
        where = process.cwd()
    }

    return Generator.create({
        templatesPath: path.join(__dirname, 'templates'),
        templateName: templateName,
        specification: specification,
        destination: where
    });
};