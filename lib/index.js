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

var fs     = require('fs'),
    path   = require('path'),
    util   = require('util'),
    events = require('events');

function Generator (options) {

    var self = this;

    this.$$templatesPath = options.templatesPath;
    this.$$templateName  = options.templateName;
    this.$$specification = options.specification;

    events.EventEmitter.call(this);

    if (!this.$$templateName) {
        return process.nextTick(function onTick ()  {
            self.emit('error', new Error('Please define the template name.'));
        });
    }
    
    this.$$build();
}

util.inherits(Generator, events.EventEmitter);

/**
 * Checks if the template from which a module should
 * be generated exists.
 * 
 * @return {[type]} [description]
 *
 */
Generator.prototype.$$exists = function $$exists (cb) {
    var templatePath = path.join(this.$$templatesPath, this.$$templateName);

    function onExists (exists) {
        if (!exists) {
            return cb(new Error('The specified template does not exist.'));
        }

        return cb(null);
    }

    fs.exists(templatePath, onExists);
};

/**
 * DOCME
 *
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 *
 */
Generator.prototype.$$parse = function $$parse (cb) {
    var self    = this,
        regexe  = /\@([^@]+)\@/g,
        pkgjson = path.join(this.$$templatesPath, this.$$templateName, 'package.json'),
        matches = [];

    function validate () {
        console.log('validate');
        console.log(matches);

        var spec;

        for (spec in self.$$specification) {

        }
    }

    function onRead (err, contents) {
        var hits;

        if (err) {
            return cb(err);
        }

        do {
            hits = regexe.exec(contents);

            if (hits) {
                matches.push(hits[1]);
            }
        } while (hits);

        return validate();
    }

    fs.readFile(pkgjson, onRead)

    return cb(null);
};

/**
 * DOCME
 *
 * @return {[type]} [description]
 *
 */
Generator.prototype.$$build = function $$build () {
    var self     = this,
        workflow = [];

    function next (err) {
        var fn;

        if (err) {
            return self.emit('error', err);
        }

        fn = workflow.pop();

        if (!fn) {
            return self.emit('done');
        }

        return fn(next);
    }

    workflow.unshift(this.$$exists.bind(this));
    workflow.unshift(this.$$parse.bind(this));

    return next();
};

/**
 * DOCME
 *
 * @return {[type]} [description]
 *
 */
exports.create = function create (options) {
    return new Generator(options);
};