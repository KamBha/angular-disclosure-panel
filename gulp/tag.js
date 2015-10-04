'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var git = require('gulp-git');
var bump = require('gulp-bump');
var filter = require('gulp-filter');
var tag_version = require('gulp-tag-version');


var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

function inc(importance) {
    // get all the files to bump version in
    return gulp.src(['./package.json', './bower.json'])
        // bump the version number in those files
        .pipe(bump({type: importance}))
        // save it back to filesystem
        .pipe(gulp.dest('./'))
        // commit the changed version number
        .pipe(git.commit('bumps package version'))

        // read only one file to get the version number
        .pipe(filter('package.json'))
        // **tag it in the repository**
        .pipe(tag_version());
}

gulp.task('patch', ['build'], function() { return inc('patch'); })
gulp.task('feature', ['build'], function() { return inc('minor'); })
gulp.task('release', ['build'], function() { return inc('major'); })
