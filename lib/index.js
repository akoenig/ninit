/*
 * mgen
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

var util   = require('util'),
    events = require('events');

function Generator () {

}

util.inherits(Generator, events.EventEmitter);

/**
 * DOCME
 *
 * @return {[type]} [description]
 *
 */
exports.create = function create () {
    return new Generator();
};