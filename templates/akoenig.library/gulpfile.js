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

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var paths = {};

paths.sources = ['./lib/**/*.js', './specs/**/*.js', 'gulpfile.js', 'index.js'];
paths.specs   = ['./specs/**/*.spec.js'];

gulp.task('lint', function () {
    return gulp.src(paths.sources)
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
    return gulp.src(paths.specs)
        .pipe(jasmine());
});

gulp.task('default', ['lint', 'test']);