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

var fs      = require('fs'),
    path    = require('path'),
    util    = require('util'),
    events  = require('events'),
    es      = require('event-stream'),
    mkdirp  = require('mkdirp'),
    frep    = require('frep'),
    Helpers = require('./utilities');

function Generator (options) {

    var self = this;

    this.$$templatesPath = options.templatesPath;
    this.$$templateName  = options.templateName;
    this.$$specification = options.specification;
    this.$$destination   = options.destination;

    // All the files within a template.
    // This will be filled within the build process.
    this.$$files = [];

    events.EventEmitter.call(this);

    Helpers.normalizeTokens(this.$$specification);

    //
    // The @name@ is the only required attribute.
    // Therefore this has to be defined.
    //
    if (!this.$$specification['@name@']) {
        return process.nextTick(function onTick ()  {
            self.emit('error', new Error('Please define the @name@ attribute.'));
        });
    }

    if (!this.$$templateName) {
        return process.nextTick(function onTick ()  {
            self.emit('error', new Error('Please define the template name.'));
        });
    }
    
    this.$$build();
}

util.inherits(Generator, events.EventEmitter);

/**
 * DOCME
 *
 * @param  {[type]} sourceFile [description]
 * @return {[type]}            [description]
 */
Generator.prototype.$$removeSourcePath = function $$removeSourcePath (sourceFile) {
    return sourceFile.replace(path.join(this.$$templatesPath, this.$$templateName), '');
};

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
 * Generates a deep file listing of all
 * files within the template.
 *
 * @return {[type]} [description]
 *
 */
Generator.prototype.$$collect = function $$collect (cb) {
    var self = this,
        templatePath = path.join(this.$$templatesPath, this.$$templateName);

    function onWalked (err, files) {
        if (err) {
            return cb(new Error('Autsch! Had a problem while collecting all files from the template ' + err));
        }

        self.$$files = files;

        return cb(null);
    }

    Helpers.walker(templatePath, onWalked);
};

/**
 * DOCME
 *
 * @return {[type]} [description]
 *
 */
Generator.prototype.$$structurize = function $$structurize (cb) {
    var self = this,
        files = this.$$files.slice(0, this.$$files.length);

    this.$$destination = path.join(this.$$destination, this.$$specification['@name@']);

    function next (err) {
        var file;

        if (err) {
            return cb(new Error('Autsch! Had a problem while creating the directory structure ' + err));
        }

        file = files.pop();


        if (file) {
            file = path.join(self.$$destination, path.dirname(self.$$removeSourcePath(file)));

            mkdirp(file, next);
        } else {
            return cb(null);
        }
    }

    function onExists (exists) {
        if (exists) {
            return self.emit('error', new Error(self.$$specification['@name@'] + ' exists already'));
        }

        next();
    }

    fs.exists(this.$$destination, onExists);
};

/**
 * DOCME
 *
 * @return {[type]} [description]
 *
 */
Generator.prototype.$$transform = function $$transform () {
    var self  = this,
        len   = this.$$files.length,
        i     = 0,
        count = 0;


    function replace () {
        return es.map(function onMap (contents, cb) {
            contents = contents.toString('utf-8');

            return cb(null, new Buffer(frep.strWithObj(contents, self.$$specification)));
        });
    }

    function pipeline (file) {
        var writer = fs.createWriteStream(path.join(self.$$destination, self.$$removeSourcePath(file))),
            reader;

        writer.once('error', function onError (err) {
            self.emit('error', err);
        });

        writer.once('finish', function onEnd () {
            count = count + 1;

            if (count === len) {
                self.emit('done');
            }
        });

        reader = fs.createReadStream(file)
            .pipe(replace())
            .pipe(writer);


        reader.once('error', function onError (err) {
            self.emit('error', err);
        });

    }

    for (i; i < len; i = i + 1) {
        pipeline(this.$$files[i]);
    }
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
    workflow.unshift(this.$$collect.bind(this));
    workflow.unshift(this.$$structurize.bind(this));
    workflow.unshift(this.$$transform.bind(this));

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