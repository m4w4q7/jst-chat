'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');

gulp.task('browserify', function () {
	return browserify({
			entries: './client/index/index.js',
			debug: true,
			transform: [babelify]
		})
		.bundle()
		.pipe(source('index.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.on('error', gutil.log)
		.pipe(sourcemaps.write('../map/'))
		.pipe(gulp.dest('./app/public/js/'));
});
gulp.task('build', ['browserify']);
gulp.task('default', ['build']);
