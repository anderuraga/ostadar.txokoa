/* Automatizador de Tareas */

//librerias
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var merge = require('merge-stream');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

//Tasks

gulp.task('clean', function () {
    return gulp.src('./dist/*')
        .pipe(clean({force: true}));

});

gulp.task('sass', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/assets/css/'));
});

gulp.task('html', function() {
    gulp.src([
                    'src/html/head.html',
                    'src/html/index.html',
                    'src/html/footer.html'
                  ])
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('move', function() {
  gulp.src('src/assets/**.*')
      .pipe(gulp.dest('./dist/'));
});



//Default task
gulp.task('default',function() {

    livereload.listen();

    gulp.watch('src/sass/**/*.scss',['sass','html','move']);
    gulp.watch('src/html/**/*.html',['sass','html','move']);
});
