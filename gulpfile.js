var gulp = require('gulp'),
    less = require('gulp-stylus'),
    lint = require('gulp-jshint'),
    watch = require('gulp-watch'),
    nodemon = require('gulp-nodemon');

gulp.task('stylus', function() {
  gulp.src('./stylus/*.styl')
    .pipe(less())
    .pipe(gulp.dest('./public/css'));
});


gulp.task('lint', function(){
  gulp.src('./public/scripts/**/*.js')
  .pipe(lint())
  .pipe(lint.reporter('default'));
});

gulp.task('develop', function () {
  process.env.NODE_ENV = 'dev';
  nodemon({ script: 'server.js', ext: 'styl html js', ignore: ['node_modules/', 'test/'] })
    .on('change', ['stylus', 'lint'])
    .on('restart', function(){
      console.log('restarted');
    }) 
});

gulp.task('default', ['stylus', 'lint']);