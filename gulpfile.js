'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

gulp.task('browserify', function () {
	return browserify({
			entries: './client/index/main.js',
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
		.pipe(gulp.dest('./server/public/js/'));
});
gulp.task('build', ['browserify']);
gulp.task('default', ['build']);
