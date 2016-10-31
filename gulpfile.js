const gulp = require('gulp');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const annotate = require('gulp-ng-annotate');
const uglify = require('gulp-uglify');
// const sass = require('gulp-sass');
const less = require('gulp-less');
// const css = require('gulp-css');

var paths = {
  jsSource: ['./public/js/**/*.js'],
  // sassSource: ['./public/styles/**/*.sass', './public/styles/**/*.scss'],
  lessSource: ['./public/styles/**/*.less']
  // cssSource: ['./public/styles/**/*.css']
};

gulp.task('less', function(){
  return gulp.src(paths.lessSource)
  .pipe(less())
  .pipe(concat('style.css'))
  .pipe(gulp.dest('./public'));
});

// gulp.task('sass', function(){
//   return gulp.src(paths.sassSource)
//   .pipe(sass())
//   .pipe(concat('style2.css'))
//   .pipe(gulp.dest('./public'));
//
// });
//
// gulp.task('css', function(){
//   return gulp.src(paths.cssSource)
//   .pipe(css())
//   .pipe(concat('style3.css'))
//   .pipe(gulp.dest('./public'));
// });

gulp.task('js', function(){
  return gulp.src(paths.jsSource)
    .pipe(concat('bundle.js'))
    .pipe(annotate())
    .pipe(uglify())
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['watch', 'js',
 // 'sass',
 'less',
 // 'css'
]);

gulp.task('watch', function(){
  gulp.watch(paths.jsSource, ['js']);
  // gulp.watch(paths.sassSource, ['sass']);
  // gulp.watch(paths.cssSource, ['css']);
  gulp.watch(paths.lessSource, ['less']);

});
