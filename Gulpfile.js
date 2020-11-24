const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const prettier = require('gulp-prettier');
const sourcemaps = require('gulp-sourcemaps');

const mode = require('gulp-mode')({
  modes: ['production', 'development'],
  default: 'development',
  verbose: false,
});

const input = 'styles/**/*.scss';
const output = 'dist';

const compile_scss_to_css = () => {
  // console.log(autoprefixer().info());
  return (
    gulp //add gulp without return to keep session going
      // Find all .scss files from the sass/ folder
      .src(input)
      // Init sourcemaps if on development mode
      .pipe(mode.development(sourcemaps.init()))
      // Run Sass on those files || pipe adds everything together
      .pipe(sass().on('error', sass.logError)) //error log to keep session going when scss contains error
      // Run autoprefixer
      .pipe(postcss([autoprefixer()]))
      // Run prettier if on development mode
      .pipe(mode.development(prettier()))
      // Run sourcemaps if on development mode
      .pipe(mode.development(sourcemaps.write('.')))
      // Minify css if on production mode
      .pipe(mode.production(cleanCSS()))
      // Write the resulting CSS in the output folder
      .pipe(gulp.dest(output))
  );
};

gulp.task('watch', function () {
  gulp.watch(input, compile_scss_to_css);
});

gulp.task('build', compile_scss_to_css);
gulp.task('default', compile_scss_to_css);
