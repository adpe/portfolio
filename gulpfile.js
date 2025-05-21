const gulp = require('gulp');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const purgecss = require('gulp-purgecss')

function isNotMinified(file) {
    return !file.path.endsWith('.min.css') && !file.path.endsWith('.min.js');
}

gulp.task('minify-css', function () {
    return gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'themes/resume/src/css/libs/fork-awesome.min.css',
            'themes/resume/src/css/libs/icomoon.min.css',
            'themes/resume/src/css/libs/simple-line-icons.min.css',
            'themes/resume/src/css/*.css',
        ])
        .pipe(sourcemaps.init())
        .pipe(gulpIf(isNotMinified, postcss([autoprefixer, cssnano])))
        .pipe(concat('all.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('themes/resume/static/css'));
});

gulp.task('minify-js', function () {
    return gulp.src([
            'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            'themes/resume/src/js/*.js',
        ])
        .pipe(sourcemaps.init())
        .pipe(gulpIf(isNotMinified, uglify()))
        .pipe(concat('all.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('themes/resume/static/js'));
});

gulp.task('purgecss', () => {
    return gulp.src('themes/resume/src/css/*.css')
        .pipe(purgecss({
            content: ['themes/resume/layouts/**/*.html'],
            safelist: [
                /^github$/,                     // .github
                /^linkedin$/,                   // .linkedin
                /^stack-overflow$/,             // .stack-overflow
                /^xing$/,                       // .xing
                /^telegram$/,                   // .telegram
                /^signalapp$/,                  // .signalapp
                /^icomoon-findpenguins$/,
            ]
        }))
        .pipe(gulp.dest('themes/resume/src/css'))
});

gulp.task('default', gulp.parallel('purgecss', 'minify-css', 'minify-js'));
