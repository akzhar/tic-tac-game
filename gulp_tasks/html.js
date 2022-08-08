'use strict';

const gulp = require('gulp');
const multipipe = require('multipipe');
const sourcemaps = require('gulp-sourcemaps'); // позволяет смотреть отдельно уже склеенные в 1 файлы
const pug = require('gulp-pug');
const htmlMin = require('gulp-htmlmin');
const notify = require('gulp-notify');
const debug = require('gulp-debug');

module.exports = function (options) {
	return function () {
		return multipipe(
			gulp.src(options.src),
			sourcemaps.init(),
			pug(),
			sourcemaps.write(),
			htmlMin(),
			debug({ title: 'html:' }),
			gulp.dest(options.dest)
		).on('error', notify.onError(function (err) {
			return {
				title: 'HTML',
				message: err.message
			};
		}));
	};
};