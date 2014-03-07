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

var fs = require('fs');

/**
 * Parses all tokens out of a string.
 *
 * @param  {[type]} pkgjsonPath [description]
 * @return {[type]}             [description]
 *
 */
exports.getTokens = function getTokens (contents) {
    var regexe = /\@([^@]+)\@/g,
        matches = [],
        hits;

    do {
        hits = regexe.exec(contents);

        if (hits) {
            matches.push(hits[1]);
        }
    } while (hits);

    return matches;
};

/**
 * Checks if the tokens are correct.
 *
 * @return {[type]} [description]
 *
 */
exports.normalizeTokens = function normalizeTokens (specification) {
    var token = '@',
        spec,
        normalized;

    for (spec in specification) {
        if (specification.hasOwnProperty(spec)) {
            normalized = token + spec.replace(token, '') + token;
            specification[normalized] = specification[spec];

            delete specification[spec];
        }
    }
};

/**
 * Recursive directory walker.
 *
 */
exports.walker = function walker (dir, next) {
    var results = [],
        opens;

    fs.readdir(dir, function (err, list) {
        if (err) {
            return next(err);
        }

        opens = list.length;

        if (!opens) {
            return next(null, results);
        }

        list.forEach(function (file) {
            file = dir + '/' + file;

            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walker(file, function(err, res) {
                        results = results.concat(res);

                        if (!--opens) {
                            return next(null, results);
                        }
                    });
                } else {

                    results.push(file);

                    if (!--opens) {
                        return next(null, results);
                    }
                }
            });
        });
    });
};