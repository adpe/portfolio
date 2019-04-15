const gulp = require('gulp');
const cssnano = require('cssnano');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

srcDir = 'themes/resume/static/css/*.css'
destDir = 'themes/resume/static/css'

gulp.task('default', function () {
    return gulp.src(srcDir)
        .pipe(postcss([autoprefixer, cssnano]))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(destDir));
});
