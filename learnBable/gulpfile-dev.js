var babel = require('gulp-babel'),
  gulp = require('gulp'),
  print = require('gulp-print'),
  webserver = require('gulp-webserver')

gulp.task('js', function() {
  return gulp.src('src/js/**/*.js') // #1. select all js files in the app folder
    .pipe(print()) // #2. print each file in the stream
    .pipe(babel({ presets: ['es2015'] })) // #3. transpile ES2015 to ES5 using ES2015 preset
    .pipe(gulp.dest('build/js')); // #4. copy the results to the build folder
});

gulp.task('libs', function() {
  return gulp.src([
      'node_modules/systemjs/dist/system.js',
      'node_modules/babel-polyfill/dist/polyfill.js'
    ])
    .pipe(print())
    .pipe(gulp.dest('build/libs'));
});

gulp.task('build', function() {
  return gulp.src('src/js/**/*.*')
    .pipe(print())
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['js', 'libs'], function() {
  return gulp.src(['src/**/*.html', 'src/**/*.css'])
    .pipe(print())
    .pipe(gulp.dest('build'));
});

gulp.task('serve', ['build'], function() {
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch(['src/**/*.html', 'src/**/*.css'], ['build']);
  gulp.src('build')
    .pipe(webserver({ open: true }));
});


gulp.task('default', ['serve']);