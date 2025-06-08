const { src, dest, series, parallel } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const del = require('del');

// Clean dist directory
function clean() {
  return del(['dist']);
}

// Copy other files (e.g., images, fonts)
function copyAssets() {
  return src(['src/assets/**/*'])
    .pipe(dest('dist/assets'));
}

// Minify HTML
function minifyHtml() {
  return src('src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest('dist'));
}

// Minify CSS
function minifyCss() {
  return src('src/**/*.css')
    .pipe(cleanCSS())
    .pipe(dest('dist'));
}

// Minify JS
function minifyJs() {
  return src('src/**/*.js')
    .pipe(terser())
    .pipe(dest('dist'));
}

exports.default = series(
  clean,
  parallel(minifyHtml, minifyCss, minifyJs, copyAssets)
);