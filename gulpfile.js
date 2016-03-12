'use strict';
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var rubySass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var fs = require('fs');
var browserSync = require('browser-sync').create()

gulp.task('generateDistVersion', function () {
    fs.writeFileSync('app/Public/College/js/config.dist.js',''+
        '(function(){' +
        '"use strict";' +
        'window.appConfig={};' +
        'window.appConfig.debug=false;' +
        'window.appConfig.version="' +(new Date().getTime())+'";'+
        'if(window.appConfig.debug){' +
        '    window.appConfig.bust="?v="+(new Date().getTime());' +
        '}else{' +
        '    window.appConfig.bust="?v="+window.appConfig.version;' +
        '}' +
        '}());' +
        '' +
        '');
});

gulp.task('clearDistVersion',['build'], function () {
    fs.writeFileSync('app/Public/College/js/config.dist.js','');
});

gulp.task('sass', function () {
    return gulp.src(['app/public/css/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(plugins.sass({outputStyle: 'compact'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/public/css'));
});

gulp.task('less', function () {
    return gulp.src('app/Public/College/css/second.less')
        .pipe(sourcemaps.init())
        .pipe(plugins.less())
        .pipe(sourcemaps.write('../maps/less'))
        .pipe(gulp.dest('app/Public/College/css/'));
});

//gulp.task('rubySass', function () {
//    return rubySass('app/vendor/bootstrap-sass-3.3.5/assets/stylesheets/bootstrap.scss',{ sourcemap: true })
//        .pipe(sourcemaps.write('./'))
//        .pipe(gulp.dest('app/vendor/bootstrap-sass-3.3.5/assets/stylesheets/'));
//});



gulp.task('styles',['sass','less'], function () {

});

//gulp.task('coffee', function () {
//    return gulp.src('app/**/*.coffee')
//        .pipe(plugins.coffee())
//        .pipe(gulp.dest('app/'));
//});
//gulp.task('transJson', function () {
//    return gulp.src('app/i18n/*.json')
//        .pipe(gulp.dest('dist/i18n'))
//
//});

gulp.task('html', function () {
    return gulp.src('app/Public/College/views/**/*.html')
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
            conditionals: true
        }))
        .pipe(gulp.dest('dist/Public/College/views/'))
});

//gulp.task('fonts', function () {
//    return gulp.src(require('main-bower-files')({
//            filter: '**/*.{eot,svg,ttf,woff,woff2}'
//        }).concat('app/fonts/**/*'))
//        .pipe(gulp.dest('.tmp/fonts'))
//        .pipe(gulp.dest('dist/fonts'));
//});

//gulp.task('fonts', function () {
//    return gulp.src('**/*.{eot,svg,ttf,woff,woff2}')
//        .pipe(plugins.flatten())
//        .pipe(gulp.dest('dist/fonts'));
//});


//gulp.task('favicon', function () {
//    return gulp.src('app/favicon.ico')
//        .pipe(gulp.dest('dist/'))
//});

//gulp.task('docIcons', function () {
//    return gulp.src('app/images/docIcons/*.{png,gif,jpg}')
//        .pipe(gulp.dest('dist/images/docIcons'))
//
//});

gulp.task('haloIcon', function () {
    return gulp.src('app/css/lib/ux_1457574849_968604/**/*iconfont.*')
        .pipe(gulp.dest('dist/css/lib/ux_1457574849_968604/'))
});

gulp.task('videojs', function () {
    var jsFilter = plugins.filter('**/*.js',{restore: true});
    var cssFilter = plugins.filter('**/*.css',{restore: true});
    return gulp.src(['app/Public/College/js/lib/video.js/5.5.3/dist/video-js.css', 'app/Public/College/js/lib/video.js/5.5.3/dist/video.js'])
        .pipe(jsFilter)
        .pipe(plugins.uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(plugins.autoprefixer({
            browsers:  ['> 0%'],
            cascade: false
        }))
        .pipe(plugins.csso())
        .pipe(cssFilter.restore)
        .pipe(gulp.dest('dist/Public/College/js/lib/video.js/5.5.3/dist/'))
});
gulp.task('swiper', function () {
    var jsFilter = plugins.filter('**/*.js',{restore: true});
    var cssFilter = plugins.filter('**/*.css',{restore: true});
    return gulp.src(['app/Public/College/js/lib/Swiper/3.3.0/dist/css/swiper.css', 'app/Public/College/js/lib/Swiper/3.3.0/dist/js/swiper.jquery.js'])
        .pipe(jsFilter)
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/Public/College/js/lib/Swiper/3.3.0/dist/js/'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(plugins.autoprefixer({
            browsers:  ['> 0%'],
            cascade: false
        }))
        .pipe(plugins.csso())
        .pipe(gulp.dest('dist/Public/College/js/lib/Swiper/3.3.0/dist/css/'))
        .pipe(cssFilter.restore)

});



gulp.task('images', function () {
    return gulp.src(['app/images/*.{png,gif,jpg,mp3,mp4}'])
        .pipe(plugins.flatten())
        .pipe(gulp.dest('dist/images'))
});

gulp.task('map', function () {
    return gulp.src(['app/css/*.map'])
        .pipe(gulp.dest('dist/css'))
});


gulp.task('build', ['sass'], function () {
    var htmlFilter = plugins.filter('*.html',{restore: true});
    var jsFilter = plugins.filter('**/*.js',{restore: true});
    var cssFilter = plugins.filter('**/*.css',{restore: true});
    //var assets;
    return gulp.src(['app/views/**/*.hbs'])
        .pipe(plugins.cdnizer({
            defaultCDNBase: "../../",
            allowRev: true,
            allowMin: true,
            files: [
                // Thi
                // s file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
                '/app/public/css/**/*.css',
                '/app/public/js/*.js',
                '/app/public/images/*.{jpg,png,mp3,mp4}',
            ]
        }))
        .pipe(plugins.useref())
        .pipe(jsFilter)
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .pipe(plugins.uglify())
        .pipe(plugins.rev())
        .pipe(jsFilter.restore)
        //.pipe(cssFilter)
        //.pipe(plugins.autoprefixer({
        //    browsers:  ['> 0%'],
        //    cascade: false
        //}))
        //.pipe(plugins.csso())
        //.pipe(plugins.rev())
        //.pipe(cssFilter.restore)
        .pipe(plugins.revReplace({
            replaceInExtensions: ['.js', '.css', '.html', '.hbs']
        }))
        //.pipe(htmlFilter)
        //.pipe(plugins.minifyHtml({
        //    empty: true,
        //    spare: true,
        //    quotes: true,
        //    conditionals: true
        //}))
        //.pipe(htmlFilter.restore)
        .pipe(plugins.cdnizer({
            defaultCDNBase: "/public",
            allowRev: true,
            allowMin: true,
            files: [
                // This file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
                'public2/css/**/*.css',
                'public/js/*.js',
                'public/images/*.{jpg,png,mp3,mp4}',
            ]
        }))
        .pipe(gulp.dest('views'))
});

gulp.task('build:dev', ['map','images','haloIcon','sass'], function () {
    var htmlFilter = plugins.filter('*.html',{restore: true});
    var jsFilter = plugins.filter('**/*.js',{restore: true});
    var cssFilter = plugins.filter('**/*.css',{restore: true});
    //var assets;
    return gulp.src(['app/*.hbs'])
        //.pipe(assets = plugins.useref.assets())
        .pipe(plugins.useref())
        .pipe(jsFilter)
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        //.pipe(plugins.uglify())
        .pipe(plugins.rev())
        .pipe(jsFilter.restore)
        .pipe(gulp.dest('dist'))
        .pipe(cssFilter)
        .pipe(plugins.autoprefixer({
            browsers:  ['> 0%'],
            cascade: false
        }))
        //.pipe(plugins.csso())
        .pipe(plugins.rev())
        .pipe(cssFilter.restore)

        .pipe(gulp.dest('dist'))
        .pipe(plugins.revReplace({
            replaceInExtensions: ['.js', '.css', '.html', '.hbs']
        }))
        //.pipe(htmlFilter)
        //.pipe(plugins.minifyHtml({
        //    empty: true,
        //    spare: true,
        //    quotes: true,
        //    conditionals: true
        //}))
        //.pipe(htmlFilter.restore)
        .pipe(plugins.cdnizer({
            defaultCDNBase: "/qingjian/1/dist",
            allowRev: true,
            allowMin: true,
            files: [
                // This file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
                'css/**/*.css',
                'js/*.js',
                'images/*.{jpg,png,mp3,mp4}',
            ]
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        open: false,
        ui: false,
        //notify: false,
        port: 9000,
        server: {
            baseDir: "./"
        }
    });

});



gulp.task('build:test', function () {

    var htmlFilter = plugins.filter('*.html',{restore: true});
    var jsFilter = plugins.filter('**/*.js',{restore: true});
    var cssFilter = plugins.filter('**/*.css',{restore: true});
    //var assets;
    return gulp.src(['app/views/*.hbs'])
        .pipe(plugins.useref())
        .pipe(jsFilter)
        //.pipe(plugins.babel({
        //    presets: ['es2015']
        //}))
        ////.pipe(plugins.uglify())
        .pipe(plugins.rev())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        //.pipe(plugins.autoprefixer({
        //    browsers:  ['> 0%'],
        //    cascade: false
        //}))
        //.pipe(plugins.csso())
        .pipe(plugins.rev())
        .pipe(cssFilter.restore)
        .pipe(plugins.revReplace({
            replaceInExtensions: ['.js', '.css', '.html', '.hbs']
        }))
        //.pipe(htmlFilter)
        //.pipe(plugins.minifyHtml({
        //    empty: true,
        //    spare: true,
        //    quotes: true,
        //    conditionals: true
        //}))
        //.pipe(htmlFilter.restore)
        .pipe(plugins.cdnizer({
            defaultCDNBase: "/qingjian/1/dist",
            allowRev: true,
            allowMin: true,
            files: [
                // This file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
                'css/**/*.css',
                'js/*.js',
                'images/*.{jpg,png,mp3,mp4}',
            ]
        }))
        .pipe(gulp.dest('dist'))
});


gulp.task('copy:dev:style',['sass'], function () {
    return gulp
        .src('app/public/css/**/*.{css,map}')
        .pipe(gulp.dest('publicTest/css'));
});


gulp.task('copy:view', function () {
    return gulp
        .src('app/views/**/*.hbs')
        .pipe(plugins.cdnizer({
            defaultCDNBase: "http://localhost:9000/app",
            //defaultCDNBase: "../",
            allowRev: true,
            allowMin: true,
            relativeRoot: 'app',
            files: [
                // Thi
                // s file is on the default CDN, and will replaced with //my.cdn.host/base/js/app.js
                '**/public/css/**/*.css',
                '**/public/js/**/*.js',
                '**/public/images/**/*.{jpg,png,mp3,mp4}',
            ]
        }))
        .pipe(gulp.dest('views'));
});

//gulp.task('copy:dev',['build:dev'], function () {
//    return gulp
//        .src('dist/index.ejs')
//        .pipe(gulp.dest('../../../views/qingjian/1/'));
//
//});


gulp.task('clean', require('del').bind(null, [ 'views']));




gulp.task('default', ['clean'], function() {
    gulp.start('build');
});



gulp.task('dev', ['browser-sync','copy:view','sass'], function() {
    gulp.start('watch:dev');
});



gulp.task("watch", function(){
    gulp.watch(['app/js/**/*.js','app/css/**/*.css','app/images/**/*.{jpg,png,mp3,mp4}','app/*.ejs'], function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.start('default');

    });
});


//gulp.task("watch:dev", function(){
//    gulp.watch(['app/views/**/*.hbs'], function(event) {
//        gulp.src('app/views/**/*.hbs')
//        .pipe(gulp.dest('publicTest/css'));
//    });
//});

gulp.task("watch:dev", function(){
    gulp.watch(['app/views/**/*.hbs']).on("change", function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        gulp.src(event.path).pipe(gulp.dest('views'));
    });
    gulp.watch(['app/public/css/*.scss'],['sass']);
});






var rev = require("gulp-rev");
var revReplace = require("gulp-rev-replace");
gulp.task("revision", function(){
    return gulp.src(["dist/**/*.css", "dist/**/*.js"])
        .pipe(rev())
        .pipe(gulp.dest('dist2'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist2'))
});




gulp.task("revreplace", ["revision"], function(){
    var manifest = gulp.src("./" + 'dist2' + "/rev-manifest.json");

    return gulp.src('dist' + "/index.html")
        .pipe(revReplace({
            manifest: manifest
        }))
        .pipe(gulp.dest('dist2'));
});
