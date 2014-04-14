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
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');

/**
 * Lints your javascript files.
 *
 */
gulp.task('lint', function () {
	return gulp.src('./app/scripts/{!(vendor)/**/*.js,*.js}')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 * Starts a development server.
 *
 */
gulp.task('dev:server', function () {
	return connect.server({
		root: 'app',
		port: 8080,
		livereload: true
	});
});

/**
 * Observes your javascript files for changes,
 * reloads the changes in the browser.
 *
 */
gulp.task('dev:observe:javascript', function () {
	var watchables = 'app/scripts/**/*.js';

	function onChange (files) {
		return files
		    .pipe(connect.reload());
	}

	return gulp.src(watchables)
		.pipe(watch(onChange));
		
});

/**
 * Observes your templates for changes and
 * reloads the changes in the browser.
 *
 */
gulp.task('dev:observe:templates', function () {
	var watchables = 'app/{*.html,templates/**/*.html}';

	function onChange (files) {
		return files.pipe(connect.reload());
	}

	return gulp.src(watchables)
		.pipe(watch(onChange));
});

/**
 * Observes your styles and reloads the
 * changes in the browser.
 *
 */
gulp.task('dev:observe:styles', function () {
	var watchables = 'app/styles/**/*.css';

	function onChange (files) {
		return files.pipe(connect.reload());
	}

	return gulp.src(watchables)
		.pipe(watch(onChange));
});

gulp.task('default', ['dev']);

gulp.task('dev', [
	'dev:server',
	'dev:observe:javascript',
	'dev:observe:styles',
	'dev:observe:templates'
]);