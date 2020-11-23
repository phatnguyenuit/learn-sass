const gulp = require('gulp');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-sourcemaps');

// https://medium.com/@jhinter/setting-up-gulp-to-compile-scss-in-less-than-5-minutes-fee8bea2b68b

gulp.task('autoprefixer', () => {
  return gulp
    .src('./styles/*.scss')
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./out'));
});
