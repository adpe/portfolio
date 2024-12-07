const gulp = require('gulp');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');

function isNotMinified(file) {
    return !file.path.endsWith('.min.css') && !file.path.endsWith('.min.js');
}

gulp.task('minify-css', function () {
    return gulp.src([
            'themes/resume/static/css/libs/bootstrap.min.css',
            'themes/resume/static/css/libs/fork-awesome.min.css',
            'themes/resume/static/css/libs/icomoon.min.css',
            'themes/resume/static/css/libs/simple-line-icons.min.css',
            'themes/resume/static/css/*.css',
        ])
        .pipe(sourcemaps.init())
        .pipe(gulpIf(isNotMinified, postcss([autoprefixer, cssnano])))
        .pipe(concat('all.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('themes/resume/static/css'));
});

gulp.task('minify-js', function () {
    return gulp.src([
            'themes/resume/static/js/libs/jquery.min.js',
            'themes/resume/static/js/libs/bootstrap.bundle.min.js',
            'themes/resume/static/js/libs/jquery.easing.min.js',
            'themes/resume/static/js/*.js',
        ])
        .pipe(sourcemaps.init())
        .pipe(gulpIf(isNotMinified, uglify()))
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('themes/resume/static/js'));
});

gulp.task('default', gulp.parallel('minify-css', 'minify-js'));
