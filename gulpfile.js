(function() {
    var gulp = require('gulp'),
        rename = require('gulp-rename'),
        concat = require('gulp-concat'),
        imagemin = require('gulp-imagemin'),
        minifycss = require('gulp-minify-css'),
        cache = require('gulp-cache'),
        livereload = require('gulp-livereload'),
        uglify = require('gulp-uglify'),
        autoprefixer = require('gulp-autoprefixer'),
        del = require('del'),
        chmod = require('gulp-chmod');

        // Styles Dependency Task
        gulp.task('stylesdep', function() {
            return gulp.src(['styles/css/normalize.min.css', 'bower_components/bootstrap/dist/css/bootstrap.min.css', 'styles/css/jquery.fancybox.css', 'styles/css/flexslider.css', 'styles/css/styles.css', 'styles/css/queries.css', 'styles/css/etline-font.css', 'bower_components/animate.css/animate.min.css'])
                .pipe(concat('cssDependencies.min.css'))
                // .pipe(minifycss())
                .pipe(gulp.dest('public/css'))
        });

    // Main App js

   
    // Js Dependencies
    gulp.task('dependencies', function() {
        return gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/retina.js/dist/retina.js','app/main/js/jquery.fancybox.pack.js', 'bower_components/bootstrap/dist/js/bootstrap.min.js','app/main/js/scripts-min.js','app/main/js/jquery.flexslider-min.js','bower_components/classie/classie.js','bower_components/waypoints/lib/jquery.waypoints.min.js'])
            .pipe(concat('dependencies.min.js'))
            .pipe(gulp.dest('public/js'))
    });

    // Gulp image compression task
    gulp.task('images', function() {
        return gulp.src('img/**')
            .pipe(gulp.dest('public/img'))
    });

    //Destroys all changes and makes new ones
    gulp.task('clean', function(callback) {
        del(['build/*'], callback)
            //         Causes an error too many call back requests
            //         cache.clearAll(callback);
    });

    // Gulp Watch files
    gulp.task('watch', function() {

        // Watch .scss files
        gulp.watch('styles/**/*.css', ['stylesdep']);

        // Watch image files
        gulp.watch('img/**/*', ['images']);

        // Create LiveReload Server
        livereload.listen();

        // Watch any files in their folder and reload on change
        gulp.watch(['styles/css/**', 'img/**/*']).on('change', livereload.changed);

    });
    // Default run of gulp
    gulp.task('default', ['clean', 'dependencies'], function() {
        gulp.start('stylesdep', 'images', 'watch');
    });



}());
