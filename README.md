# Gulp Virtual DOM Handlebars

Gulpify [virtual-dom-handlebars](https://github.com/jchook/virtual-dom-handlebars).

## Example Implementation

First install some dependencies
	
	npm install --save-dev \
		gulp \
		gulp-virtual-dom-handlebars \
		gulp-declare \
		gulp-concat-util \
		vinyl-source-stream

gulpfile.js

	var gulp = require('gulp');
	var source = require('vinyl-source-stream');
	var handlebars = require('gulp-virutal-dom-handlebars');
	var declare = require('gulp-declare');
	var concat = require('gulp-concat-util');

	// Compiles views to assets
	gulp.task('templates', function(){
		gulp.src('views/*.hbs')
			.pipe(concat('compiled.js'))
			.pipe(concat.header([
				"var h = require('virtual-dom/h');",
				"var Runtime = require('virtual-dom-handlebars');",
				""
			].join("\n")))
			.pipe(declare({
				namespace: 'module.exports',
				noRedeclare: true
			}))
			.pipe(handlebars())
			.pipe(gulp.dest('views'));
	});
