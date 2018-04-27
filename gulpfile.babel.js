const gulp = require('gulp'),
		browserSync = require('browser-sync').create(),
		del = require('del'),
		sass = require('gulp-sass'),
		exec = require('child_process').exec,
		babel = require('gulp-babel');

gulp.task('lib-js', function() {
	return gulp.src('framework/lib/**/*.js') // Get source files with gulp.src
		.pipe(gulp.dest('public/js'))
});

gulp.task('js', ['lib-js'], function() {
	return gulp.src('framework/js/**/*.js') // Get source files with gulp.src
		.pipe(babel())
		.pipe(gulp.dest('public/js'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('sass', function() {
	return gulp.src('framework/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
		.pipe(sass())
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('clean', function() {
	return del.sync('public');
});

gulp.task('html', function() {
	return gulp.src('framework/**/*.html') // Get source files with gulp.src
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
	gulp.watch('framework/scss/**/*.scss', ['sass']);
	gulp.watch('framework/js/**/*.js', ['js']);
	gulp.watch('framework/**/*.html', ['html']);
})


gulp.task('start', ['clean', 'sass', 'js', 'html', 'server', 'watch'], function (){
	// ...
})
