'use strict';

var gulp = require('gulp');
var webpack = require('webpack-stream');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var uglifySaveLicense = require('uglify-save-license');

var moduleName = 'angular-flickity';

// Bower module generation
var webpackOptions = {
    watch: false,
    module: {
        preLoaders: [{ test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader'}],
        loaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['ng-annotate', 'babel-loader']}]
    },
    output: { filename: moduleName + '.js' }
};



gulp.task('clean_dist', function() {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

gulp.task('build', ['clean_dist'], function() {
    return gulp.src('src/index.js')
        .pipe(webpack(webpackOptions))
        .pipe(rename(moduleName + '.js'))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify({ preserveComments: uglifySaveLicense }))
        .pipe(rename(moduleName + '.min.js'))
        .pipe(gulp.dest('dist/'));
    ;
});




