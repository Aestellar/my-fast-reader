let gulp = require('gulp');
let imagemin = require("gulp-imagemin");
let cache = require("gulp-cache");
const concat = require("gulp-concat");
const count = require('gulp-count');
const insert = require('gulp-insert');
const extReplace = require('gulp-ext-replace');
const watch = require('gulp-watch');
var clipboard = require("gulp-clipboard");

const fs = require('fs');

gulp.task('hello', (cb) => {
    console.log('Hello world!');
    cb();
});

gulp.task('version', (cb) => {
    asynkAwaitTask();
    cb();
});

async function asynkAwaitTask() {
    const { version } = fs.readFileSync('package.json');
    console.log(version);
    await Promise.resolve('some result');
}

gulp.task('images', () => {
    return gulp.src('./src/images/*.+(png|jpg)')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('concatPre', () => {
    return gulp.src('./src/js/*.js')
        .pipe(count('## js-files selected'))
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./src/middle/'));

});

gulp.task('mergecss',()=>{
    return gulp.src('./src/css/*.css')
    .pipe(count('## css-files selected'))
    .pipe(concat('merged.css'))
    .pipe(gulp.dest('./middle/'));
})

gulp.task('wrapcss', () => {
    return gulp.src('./middle/merged.css')
        .pipe(insert.wrap('var styleCSS = `', '`;'))
        .pipe(gulp.dest('./src/middle/'));
});

gulp.task('cssrename', () => {
    return gulp.src('./src/middle/fr.css')
        .pipe(extReplace('js', '.css'))
        .pipe(gulp.dest('./src/middle/'));
});

gulp.task('buildjs',()=>{
    return gulp.src('./src/middle/*.js')
    .pipe(concat('result.js'))
    .pipe(insert.wrap(userscriptHeader,userscriptFooter))
    .pipe(gulp.dest('./dist'));
});

gulp.task('copyToClipboard',()=>{
    return gulp.src('./dist/result.js')
    .pipe(clipboard());
});

gulp.task('build',gulp.series('concatPre','mergecss','wrapcss','cssrename','buildjs','copyToClipboard'));

gulp.task('watch',()=>{
    return gulp.watch('./src/js/*.js',gulp.series('build'));
});

let userscriptHeader = `// ==UserScript==
// @name         My Fast Reader
// @namespace    http://tampermonkey.net/
// @version      0.1 ${Date()}
// @description  try to take over the world!
// @author       You
// @match        https://tl.rulate.ru/*
// @match https://ranobes.com/*
// @match        *://*/*
// @grant        none
// @run-at document-idle
// ==/UserScript==

//clipboard test

(function() {
    'use strict';
`;
let userscriptFooter = `
FastReaderMain.init();
\n})();`;