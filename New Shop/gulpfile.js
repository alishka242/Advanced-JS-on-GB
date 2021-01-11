const gulp 			= require('gulp');
const sass 			= require('gulp-sass');
const less 			= require('gulp-less');
const rename 		= require('gulp-rename');
const autoprefixer 	= require('gulp-autoprefixer');
const sourcemaps 	= require('gulp-sourcemaps');

/* ------------ Styles compile ------------- */
gulp.task('styles:compile', function () {
	return gulp.src('./crs/layout/styles/scss/index.scss') /*файл содержащий импорты и лежащий в scss*/
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(rename('index.css'))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(gulp.dest('./crs/layout/styles/css'));
});

/* ------------ Watchers ------------- */
gulp.task('watch', function () {
	gulp.watch('./crs/layout/styles/scss/**/*.scss', gulp.series('styles:compile'));
});