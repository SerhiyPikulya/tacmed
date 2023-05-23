const { src, dest, parallel, watch } = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server
function server() {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    watch("src/*.html").on('change', browserSync.reload); //відслідковує зміни в хтмл
}

//Робота з стилями
function styles() {
  return src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest("dist/css"))
        .pipe(browserSync.stream());
}

//відслідковує зміни в стилях
function startwatch() {
    watch("src/sass/**/*.+(scss|sass|css)", parallel(styles));
    watch("src/*.html").on('change', parallel(html)); //відслідковує зміни в хтмл
}

//зміни в хтмл
function html() {
    return src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist/'));
}

//переміщення скриптів
function scripts() {
    return src("src/js/**/*.js")
        .pipe(dest('dist/js'));
}

function fonts() {
    return src("src/fonts/**/*")
        .pipe(dest('dist/fonts'));
}

function icons() {
    return src("src/icons/**/*")
        .pipe(dest('dist/icons'));
}

function mailer() {
    return src("src/mailer/**/*")
        .pipe(dest('dist/mailer'));
}

function images() {
    return src("src/img/**/*.*")
        .pipe(imagemin())
        .pipe(dest('dist/img'));
}

exports.default = parallel(startwatch, server, styles, html, scripts, fonts, icons, mailer, images);