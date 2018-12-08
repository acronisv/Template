const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();

const cssFiles = [
	'./node_modules/normalize.css/normalize.css',
	'./src/css/**/*.css'
];

const jsFiles = [
	'./src/js/*.js'
];
function styles(){
	return gulp.src(cssFiles)
		.pipe(concat('template.css'))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleanCSS({level: 2}))
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream());
}

function scripts(){
	return gulp.src(jsFiles)
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}

function watch(){
	browserSync.init({
        server: {
            baseDir: "./"
		}
		//tunnel: true
    });
	gulp.watch('./src/css/**/*.css', styles);
	gulp.watch('./src/js/**/*.js', scripts);
	gulp.watch('./*html', browserSync.reload)
}


function clean(){
	return del(['build/*'])
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);
gulp.task('clean', clean);

/*сборка с удаление из папки build*/
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts))
					);

gulp.task('dev', gulp.series('build', 'watch'));