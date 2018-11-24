var gulp = require('gulp');
var ts = require('gulp-typescript');
var connect = require('gulp-connect');
 
gulp.task('webserver', function() {
  connect.server();
});

gulp.task('build', function () {
    return gulp.src('app/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'basicSetup.js',
            target: 'es5',
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', ['build', 'webserver'], function() {
    gulp.watch('app/**/*.ts', ['build']);
});

