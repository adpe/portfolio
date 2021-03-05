const gulp = require('gulp');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

gulp.task('default', function () {
    return gulp.src([
            'themes/resume/static/css/*.css',
            '!themes/resume/static/css/*min.css'
        ])
        .pipe(postcss([autoprefixer, cssnano]))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('themes/resume/static/css'));
});
