const { src, dest, parallel, watch } = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

// Static server
function server() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });

    watch("src/*.html").on('change', browserSync.reload); //відслідковує зміни в хтмл
}

//Робота з стилями
function styles() {
  return src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest("src/css"))
        .pipe(browserSync.stream());
}

//відслідковує зміни в стилях
function startwatch() {
    watch("src/sass/**/*.+(scss|sass)", parallel(styles));
}

exports.default = parallel(startwatch, server, styles);