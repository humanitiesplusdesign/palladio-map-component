var gulp = require('gulp');

var merge = require('merge-stream');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var order = require('gulp-order');
var rename = require('gulp-rename');
var angularTemplates = require('gulp-angular-templates');

var palladioSources = [ "palladio-map-view.js" ];
var palladioCSS = [ "palladio-map-view.css" ];
var palladioTemplate = [ "template.html" ];

gulp.task('scripts', function () {
	var files = gulp.src(palladioSources)
		.pipe(concat('jsFiles.js'));

	var templates = gulp.src(palladioTemplate)
		.pipe(angularTemplates({ module: 'palladio', basePath: 'partials/palladio-map-component/' }))
		.pipe(rename('templates.tmpl'));

	merge(files, templates)
		.pipe(order(['*.js', '*.tmpl']))
        .pipe(concat('palladio-map-component.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(uglify())
        .pipe(rename('palladio-map-component.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('css', function () {
	gulp.src(palladioCSS)
		.pipe(concat('palladio-map-component.css'))
		.pipe(gulp.dest('./dist/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(palladioSources, ['scripts']);
  gulp.watch(palladioCSS, ['css']);
  gulp.watch(palladioTemplate, ['scripts']);
});

gulp.task('default', ['scripts','css','watch']);