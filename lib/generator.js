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
    // This array will be filled within the build process.
    this.$$files = [];

    events.EventEmitter.call(this);

    this.$$specification = Helpers.normalizeTokens(this.$$specification);

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
 * @private
 *
 * This method will remove the source part from a source file path (template file).
 *
 *     example:
 *
 *         before: /templates/akoenig.library/lib/index.js
 *         after:  /lib/index.js
 * 
 * 
 * @param  {string} sourceFile The complete path to the template file.
 * @return {string} The path without the source part.
 *
 */
Generator.prototype.$$removeSourcePath = function $$removeSourcePath (sourceFile) {
    return sourceFile.replace(path.join(this.$$templatesPath, this.$$templateName), '');
};

/**
 * @private
 *
 * Checks if the defined template exists.
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
 * @private
 *
 * Generates a deep list, with all files from the respective template.
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
 * @private
 *
 * Creates the whole directory structure in the destination directory.
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
 * @private
 *
 * Grabs every single source file and pipes it through
 * a replacement process in which the tokens will be replaced
 * by the actual values.
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
 * @private
 *
 * Triggers the whole generation process.
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
 * Creates a generator object.
 *
 * options:
 * 
 *     templatesPath: The path to all templates.
 *     templateName: The name of the template from which a module should be generated.
 *     specification: The mapping between the tokens and actual values.
 *     destination: The directory in which the new module should be generated.
 *
 * @param {object} options The configuration object.
 *
 * @return {Generator} The generator object.
 *
 */
exports.create = function create (options) {
    return new Generator(options);
};