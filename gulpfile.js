const gulp = require('gulp');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function () {
    return gulp.src([
            'themes/resume/static/css/*.css',
            '!themes/resume/static/css/*min.css'
        ])
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer, cssnano]))
        .pipe(sourcemaps.write('.'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('themes/resume/static/css'));
});
