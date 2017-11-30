/* Automatizador de Tareas */

//librerias
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var merge = require('merge-stream');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var nano = require('gulp-cssnano');

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
                    'src/html/nav.html',
                    //'src/html/wellcome.html',
                    'src/html/presentacion.html',
                    'src/html/fotos.html',
                    'src/html/servicios.html',
                    'src/html/precios.html',
                    'src/html/reserva.html',
                    'src/html/localizacion.html',
                    'src/html/normas.html',
                    'src/html/footer.html'
                  ])
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./dist/'));
});


gulp.task('move', function() {
  var taskAssets =  gulp.src('src/assets/**/**.*')
                .pipe(gulp.dest('./dist/assets/'));

  var taskImg = gulp.src('src/img/**.*')
                    .pipe(gulp.dest('./dist/img/'));

    return merge(taskAssets, taskImg);
});



//Default task
gulp.task('default',function() {

    livereload.listen();

    gulp.watch('src/sass/**/*.scss',['sass','html','move']);
    gulp.watch('src/html/**/*.html',['sass','html','move']);
});
