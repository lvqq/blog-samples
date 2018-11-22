var gulp = require('gulp');

var less = require('gulp-less'),                   //less 转 css
    csso = require('gulp-csso'),                   //css压缩
    concat = require('gulp-concat'),               //合并文件
    uglify = require('gulp-uglify'),               //js 压缩
    jshint = require('gulp-jshint'),               //js 检查
    clean = require('gulp-clean'),                 //清除文件
    imagemin = require('gulp-imagemin'),           //图片压缩
    rev = require('gulp-rev'),                     //添加版本号
    revReplace = require('gulp-rev-replace'),      //版本号替换
    useref = require('gulp-useref'),               //解析html资源定位
    gulpif = require('gulp-if'),                   //if语句
    connect = require('gulp-connect');             //create webserver

//图片压缩
gulp.task('dist:img', () => {
    gulp.src(['./src/**/*.jpg', './src/**/*.png'])
    .pipe(imagemin())
    .pipe(gulp.dest('dist/'))
})

//css
gulp.task('dist:css', () => {
    gulp.src('dist/css/*.css').pipe(clean());
    return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(csso())
    .pipe(concat('public.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('src:css', () => {
    gulp.src('src/css/*.css').pipe(clean());
    return gulp.src('./src/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('src/css/'));
});

//js
gulp.task('dist:js', () => {
    gulp.src('dist/js/*.js').pipe(clean());
    return gulp.src('./src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(concat('public.js'))
    .pipe(gulp.dest('dist/js/'))
});

//revision
gulp.task('revision', ['dist:css', 'dist:js'], () => {
    return gulp.src(["dist/css/*.css", "dist/js/*.js"])
    .pipe(rev())
    .pipe(gulpif('*.css', gulp.dest('dist/css'), gulp.dest('dist/js')))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist'))
})

//build
gulp.task('build', ['dist:img'], () => {
    var manifest = gulp.src('dist/rev-manifest.json');
    return gulp.src('src/index.html')
    .pipe(revReplace({
        manifest: manifest
    }))
    .pipe(useref())
    .pipe(gulp.dest('dist/'))
})

//connect
gulp.task('connect', () => {
    connect.server({
        root: 'src',
        livereload: true,
        port: 8888
    })
})

//reload
gulp.task('reload', () => {
    gulp.src('src/*.html')
    .pipe(connect.reload())
})

//watch
gulp.task('watch', () => {
    gulp.watch('src/**/*', ['src:css', 'reload'])
})


gulp.task('clean', () => {
    gulp.src('dist/*', {read: false})
    .pipe(clean())
})

gulp.task('default', ['connect','watch']);