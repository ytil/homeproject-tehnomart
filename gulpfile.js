var gulp = require('gulp');
var scss = require('gulp-sass');
var connect = require('gulp-connect');

gulp.task('html', function() {
  return gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('css', function() {
  return gulp.src('./app/**/*.css')
    .pipe(connect.reload());
});

gulp.task('scss', function() {
  return gulp.src('./app/scss/*.scss')
    .pipe(scss())
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});

gulp.task('js', function() {
  return gulp.src('./app/js/**/*.js')
    .pipe(connect.reload());
});

gulp.task('img', function() {
  return gulp.src('./app/img/**/*.+(png|jpg|svg|gif)')
    .pipe(connect.reload());
});

gulp.task('fonts', function() {
  return gulp.src('./app/fonts/*')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('./app/*.html', gulp.series('html'));
  gulp.watch('./app/js/**/*.js', gulp.series('js'));
  gulp.watch('./app/css/**/*.css', gulp.series('css'));
  gulp.watch('./app/img/**/*.+(png|jpg|svg|gif)', gulp.series('img'));
  gulp.watch('./app/fonts/*)', gulp.series('fonts'));
  gulp.watch('./app/**/*.scss', gulp.series('scss'));
});

gulp.task('connect', function() {
  connect.server({
    root: './app',
    livereload: true
  });
});

gulp.task('default', gulp.parallel('watch', 'connect'));
