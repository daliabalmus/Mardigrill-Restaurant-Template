
// Requires

const gulp                				= require('gulp');
const browserSync    				= require('browser-sync').create();
const sass              	  			= require('gulp-sass');
const swig								= require('gulp-swig');
const autoprefixer			 		= require('gulp-autoprefixer');
const removeEmptyLines 		= require('gulp-remove-empty-lines');
const cache 							= require('gulp-cached');
const plumber				 		= require('gulp-plumber');
const connect 						= require('gulp-connect');

const autoprefixerOptions = {
	browsers: ['last 2 versions']
};

// npm i -g gulp-cli !!!!!!! important for gulp v4

// Compile SASS

function scss() {
	return gulp.src('src/assets/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError ))
		.pipe(cache('scss_cache'))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(removeEmptyLines())
		.pipe(gulp.dest('dist/assets/css'))
}
exports.scss = scss;

// Compile JS

function js() {
	return gulp.src('src/assets/js/**/*.js')
		.pipe(plumber())
		.pipe(cache('js_cache'))
		.pipe(gulp.dest('dist/assets/js'))
}

exports.js = js;

// Compile js from node_modules

function vendorjs() {
	return gulp.src(
		[
			'node_modules/jquery/dist/jquery.js',
			'node_modules/popper.js/dist/umd/popper.js',
			'node_modules/bootstrap/dist/js/bootstrap.js',
		]
	)
		.pipe(gulp.dest('dist/assets/js/vendor'))
}
exports.vendorjs = vendorjs;

// Compile HTML

function html() {
	return gulp.src('src/views/pages/*.html')
		.pipe(swig({defaults: { cache: false }}))
		.on('error', function (err) {
			console.log(err.toString());
			this.emit('end');
		})
		.pipe(gulp.dest('dist'))
}
exports.html = html;

// Copy images from dist to src

function images() {
	return gulp.src('src/assets/images/**/*')
		.pipe(gulp.dest('dist/assets/images/'));
}
exports.images = images;

// Compile Icons from node_modules

function icons() {
	return gulp.src(
		[
			'node_modules/font-awesome/**/*.{min.css,ttf,otf,eot,woff,woff2,svg}',
			'node_modules/simple-line-icons/**/*.{css,eot,svg,ttf,woff,woff2}',
		]
	)
		.pipe(gulp.dest('dist/assets/fonts'))
}
exports.icons = icons;

// Connect to server


function run() {
	browserSync.init({
		server: {
			baseDir: 'dist/',
		}
	});
	gulp.watch('src/assets/scss/**/*.scss', scss);
	gulp.watch('src/views/**/*.html', html).on('change', browserSync.reload);
	gulp.watch('src/assets/js/**/*.js', js).on('change', browserSync.reload); // for js
}

exports.run = run;

gulp.task('run');

gulp.task('compile', gulp.parallel(scss, html, js));

gulp.task('start', gulp.parallel(html, js, scss, vendorjs, icons, run));


