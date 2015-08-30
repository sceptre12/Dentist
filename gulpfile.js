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

    gulp.task('appjs', ['dependencies'], function() {
        return gulp.src(['app/main/js/config.js'	])
            .pipe(concat('main.js'))
            .pipe(gulp.dest('public/js'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(uglify().on('error', function(e) {
                // ouput errors in js code to the console
                console.log('\x07', e.message);
                return this.end();
            }))
            .pipe(gulp.dest('public/js'))
    });


    // Js Dependencies
    gulp.task('dependencies', function() {
        return gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/angular/angular.js', 'bower_components/angular-ui-router/release/angular-ui-router.js', 'bower_components/angular-bootstrap/ui-bootstrap-tpls.js', 'bower_components/retina.js/dist/retina.js','app/main/js/jquery.fancybox.pack.js', 'bower_components/bootstrap/dist/js/bootstrap.min.js','app/main/js/scripts-min.js','app/main/js/jquery.flexslider-min.js','bower_components/classie/classie.js','bower_components/waypoints/lib/jquery.waypoints.min.js'])
            .pipe(concat('dependencies.min.js'))
            .pipe(gulp.dest('public/js'))
    });

    // Combination of Dependencies and App js 
    gulp.task('depandapp', ['dependencies', 'appjs'], function() {
        return gulp.src(['public/js/dependencies.min.js', 'public/js/main.min.js'])
            .pipe(concat('build.min.js'))
            .pipe(gulp.dest('public/js'))
    });

    // Gulp image compression task
    gulp.task('images', function() {
        return gulp.src('img/**')
            .pipe(chmod(755))
            .pipe(imagemin({
                optimizationLevel: 5,
                progressive: true,
                interlaced: true
            }))
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

        // Watch .js files        
        gulp.watch('app/**/*.js', ['depandapp']);

        // Watch image files
        gulp.watch('img/**/*', ['images']);

        // Create LiveReload Server
        livereload.listen();

        // Watch any files in their folder and reload on change
        gulp.watch(['styles/css/**', 'app/**', 'img/**/*']).on('change', livereload.changed);

    });
    // Default run of gulp
    gulp.task('default', ['clean', 'depandapp'], function() {
        gulp.start('stylesdep', 'images', 'watch');
    });



}());
