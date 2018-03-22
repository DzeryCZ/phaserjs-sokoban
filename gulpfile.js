var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('default', function () {
    return gulp.src('app/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'basicSetup.js',
            target: 'es5',
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('watch', ['default'], function() {
    gulp.watch('app/**/*.ts', ['default']);
});