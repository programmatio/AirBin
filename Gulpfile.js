const fs         = require('fs');
const gulp       = require('gulp');
const nodemon    = require('gulp-nodemon');


gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('default', ['start']);
