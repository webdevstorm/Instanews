// Require Gulp first!
const gulp = require("gulp");
const uglifycss = require("gulp-uglifycss");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const terser = require("gulp-terser");

const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const prettyError = require("gulp-prettyError");

// Task to compiling and minifying Sass
gulp.task("sass", function() {
  return gulp
    .src("./sass/*.scss") // What files do we want gulp to consume?
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(uglifycss()) // Call the terser function on these files
    .pipe(rename({ extname: ".min.css" })) // Rename the uglified file
    .pipe(gulp.dest("./build/css")); // Where do we put the result?
});

gulp.task("js", function() {
  return gulp
    .src("./js/*.js")
    .pipe(terser())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./build/js"));
});

// Task to watch for changes to CSS files
gulp.task("watch", function(done) {
  gulp.watch("sass/*.scss", gulp.series("sass"));
  gulp.watch("js/*.js", gulp.series("js"));
});

// Load Browser-Sync
gulp.task("browser-sync", function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp
    .watch(["build/css/*.css", "build/js/*.js"])
    .on("change", browserSync.reload);

  done();
});

// Default task
gulp.task("default", gulp.parallel("browser-sync", "watch"));

gulp.task("lint-js", function() {
  return gulp
    .src("./js/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
