// Include gulp
var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    autoprefix  = require("gulp-autoprefixer"),
    sass        = require('gulp-sass'),
    clean       = require('gulp-clean-css'),
    sourcemaps  = require('gulp-sourcemaps'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify-es').default,
    rename      = require('gulp-rename'),
    plumber     = require('gulp-plumber'),
    browserSync = require('browser-sync').create();

// Notification Styles
var codeStyle = 'style="marign-bottom: 0; border-radius: 5px; padding: 5px 10px; border: 1px solid rgba(255,255,255,.15);"';
var timeStyle = 'style="opacity: .5; float: right; margin-left: 10px;"';

// Concatenate JS Files
gulp.task('concat-scripts', function () {
  var time = '<span ' + timeStyle + '>' + gutil.date(new Date(), "[HH:MM:ss]") + '</span>';
  return gulp
  .src([
      'node_modules/@trepanation-pray/cookie/index.js',
      '../dist/weasl.min.js',
      'src/scripts.js',
      'node_modules/prismjs/prism.js'
    ])
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(concat('scripts.js'))
  .pipe(uglify())
  .on('error', function (err) {
    gutil.log(
      gutil.colors.red('⚠️ Javascript error'),
      browserSync.notify('⚠️ <strong>Javascript error</strong> ' + time + '<pre ' + codeStyle + '>' + err.message +'</pre>File: ' +  err.filename + '<br>Line: ' +  err.line , 5000),
      err.toString()
    );
  })
  .pipe(rename({ suffix: '.min' }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist'))
  .pipe(
      browserSync.stream(),
      gutil.log(
        browserSync.notify('✅ Javascript built ' + time),
      )
  );
});

// Preprocess sass file + minify
gulp.task("minify-sass", function() {
  var time = '<span ' + timeStyle + '>' + gutil.date(new Date(), "[HH:MM:ss]") + '</span>';
  return gulp
  .src("src/style.scss")
  .pipe(plumber())
  .pipe(sass({ sourcemaps: true }))
  .on('error', function ( err ) {
    gutil.log(
      gutil.colors.red('⚠️ SCSS error'),
      browserSync.notify('⚠️ <strong>SCSS error</strong> ' + time + '<pre ' + codeStyle + '>' + err.messageOriginal +'</pre>File: ' +  err.relativePath + '<br>Line: ' +  err.line , 5000),
      err.messageFormatted.toString()
    );
  })
  .pipe(autoprefix())
  .pipe(rename({ suffix: ".min" }))
  .pipe(clean({ rebase: false }))
  .pipe(gulp.dest("dist"))
  .pipe(
    browserSync.stream(),
    gutil.log(
      browserSync.notify('✅ SASS built ' + time)
    )
  );
});


gulp.task("watch", function() {
  // Browser Sync
  browserSync.init({
      server: './demo',
      serveStatic: ['.', '../dist'],
      port: 9000,
      notify: {
        styles: [
         'text-align: left',
         'display: none; ',
         'padding: 15px 20px 10px;',
         'position: fixed;',
         'font-size: 1em;',
         'line-height: 2em;',
         'z-index: 9999;',
         'left: 10px;',
         'bottom: 10px;',
         'border-radius: 5px;',
         'color: rgb(74, 74, 74);',
         'background-color: #0f2634;',
         'color: rgb(229, 229, 229);'
        ]
      }
  });
  // Watch demo page
  gulp.watch("./**/*.html").on('change', browserSync.reload);
  // Watch .js files
  gulp.watch("src/scripts.js", ["concat-scripts"]);
  // Watch .scss files
  gulp.watch("src/style.scss",["minify-sass"]);
});


// Aliases 

gulp.task('build', ['concat-scripts','minify-sass']);
gulp.task('start', ['build','watch']);