const gulp = require('gulp'),
		browserSync = require('browser-sync').create(),
		del = require('del'),
		sass = require('gulp-sass'),
		exec = require('child_process').exec,
		babel = require('gulp-babel'),
		debug = require('gulp-debug');

const pmRoot = 'node_modules';

gulp.task('lib-js', function() {
	return gulp.src('src/framework/lib/**/*.js') // Get source files with gulp.src
		.pipe(gulp.dest('public/js'))
});

gulp.task('js', ['lib-js'], function() {
	return gulp.src('src/js/**/*.js') // Get source files with gulp.src
		.pipe(babel())
		.pipe(gulp.dest('public/js'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('sass', ['foundation'], function() {
	return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
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
		.pipe(gulp.dest('public/vendors/css/'))
});

gulp.task('clean', function() {
	return del.sync('public');
});

gulp.task('assets', function() {
	return gulp.src('./src/assets/**/*.*') // Get source files with gulp.src
			.pipe(gulp.dest('public/assets'))
});

gulp.task('html', function() {
	return gulp.src('src/**/*.html') // Get source files with gulp.src
		.pipe(gulp.dest('public/'))
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'public'
		},
	})
})

gulp.task('server', function (cb) {
	exec('node server.js', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		cb(err);
	});
})

gulp.task('watch', function(){
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/**/*.html', ['html']);
})


gulp.task('start', ['clean', 'assets', 'sass', 'js', 'html', 'server', 'watch'], function (){
	// ...
})