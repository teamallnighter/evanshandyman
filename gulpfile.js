const { src, dest, series, parallel } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');

// Clean dist directory
async function clean() {
  const { deleteAsync } = await import('del');
  return deleteAsync(['dist']);
}

// Copy other files (e.g., images, fonts)
function copyAssets() {
  return src(['src/images/**/*'], { encoding: false })
    .pipe(dest('dist/images'));
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

// Define build task
const build = series(
  clean,
  parallel(minifyHtml, minifyCss, minifyJs, copyAssets)
);

exports.build = build;
exports.default = build;
