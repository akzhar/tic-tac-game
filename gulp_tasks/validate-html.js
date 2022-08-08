'use strict';

const gulp = require('gulp');
const htmlValidator = require('gulp-w3c-html-validator');
const debug = require('gulp-debug');

module.exports = function (options) {
	return function () {
		return gulp.src(options.src, { since: gulp.lastRun('validate-html') })
			.pipe(htmlValidator())
			.pipe(debug({ title: 'validate-html:' }))
			.pipe(htmlValidator.reporter());
	};
};