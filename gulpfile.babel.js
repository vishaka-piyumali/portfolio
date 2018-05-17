const gulp = require('gulp'),
		browserSync = require('browser-sync').create(),
		del = require('del'),
		sass = require('gulp-sass'),
		exec = require('child_process').exec,
		babel = require('gulp-babel'),
		debug = require('gulp-debug'),
		gulpRactive  = require('gulp-ractive'),
		declare = require('gulp-declare'),
		concat = require('gulp-concat'),
		_ = require('lodash-compat'),
		wrap = require('gulp-wrap-amd');

const pmRoot = 'node_modules';

gulp.task('ractive-templates', function() {
	return gulp.src('src/**/*.hbs')
		.pipe(gulpRactive())
		.pipe(declare({
			namespace: 'Templates',
			noRedeclare: true
		}))
		.pipe(concat('templates.js'))
		.pipe(wrap({
			exports: 'this.Templates'
		}))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('lib-js', function() {
	return gulp.src(['ractive/ractive.js',
			'jquery/dist/jquery.js',
			'foundation-sites/dist/js/foundation.min.js',
			'requirejs/require.js'
		], {cwd: pmRoot}) // Get source files with gulp.src
		.pipe(gulp.dest('public/js/vendors'))
});

gulp.task('components-js', function() {

	var depsParamsMap = {
		'Ractive': 'Ractive',
		'Templates': 'Templates'};

	return gulp.src('src/framework/components/**/*.js') // Get source files with gulp.src
		.pipe(babel())
		.pipe(concat('components.js'))
		.pipe(wrap({
			deps: _.keys(depsParamsMap),
			params: _.values(depsParamsMap),
			exports: 'Ractive.components'
		}))
		.pipe(gulp.dest('public/js'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('js', ['components-js', 'lib-js'], function() {
	return gulp.src('src/framework/*.js') // Get source files with gulp.src
		.pipe(babel())
		.pipe(gulp.dest('public/js'))
		.pipe(browserSync.reload({
			stream: true
		}))
});


gulp.task('sass', ['foundation'], function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('foundation', function() {
	return gulp.src('src/lib/vendors/css/foundation.6.4.scss')
		.pipe(sass(
				{includePaths: ['node_modules/foundation-sites/scss']}
		))
		.pipe(gulp.dest('public/css/vendors'))
});

gulp.task('clean', function() {
	return del.sync('public');
});

gulp.task('assets', function() {
	return gulp.src('./src/assets/**/*.*') // Get source files with gulp.src
			.pipe(gulp.dest('public/assets'))
});

gulp.task('data', function() {
	return gulp.src('src/data/*.json') // Get source files with gulp.src
			.pipe(gulp.dest('public/data'))
});

gulp.task('html', function() {
	return gulp.src('src/**/*.html') // Get source files with gulp.src
		.pipe(gulp.dest('public/'))
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'public'
		}
	})
});

gulp.task('server', function (cb) {
	exec('node server.js', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
});

gulp.task('watch', function(){
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/**/*.html', ['html']);
	gulp.watch('src/**.*.hbs', ['ractive-templates'])
});


gulp.task('start', ['clean', 'assets', 'data', 'sass', 'ractive-templates', 'js', 'html', 'server', 'watch'], function (){
	// ...
});
