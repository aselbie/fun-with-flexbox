var gulp = require('gulp');
var browserSync = require('browser-sync');
var postcss = require('gulp-postcss');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var jade = require('gulp-jade');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('cssnano');

gulp.task('css', function () {
  var processors = [
    precss,
    autoprefixer({browsers: ['last 2 version']}),
    cssnano()
  ];

  return gulp.src('./src/css/main.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('./src/**/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('browser-sync', function() {
   browserSync({
      server: {
        baseDir: "./dist"
      }
   });
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.css', ['css', browserSync.reload]);
  gulp.watch('./src/**/*.jade', ['jade', browserSync.reload]);
});

gulp.task('default', ['css', 'jade', 'browser-sync', 'watch']);