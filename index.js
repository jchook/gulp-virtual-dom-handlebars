var through2 = require('through2');
var gutil = require('gulp-util');

const PLUGIN_NAME = 'gulp-virtual-dom-handlebars';

module.exports = function(opts) {
	'use strict';

	opts = opts || {};
	var compilerOptions = opts.compilerOptions || {};
	var defaultCompiler = opts.handlebars || require('virtual-dom-handlebars/compile');

	return through2.obj(function(file, enc, next) {
		var 
			contents,
			compiled,
			compiler
		;

		if (file.isNull()) {
			return next(null, file);
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
			return next();
		}

		// Read file
		contents = file.contents.toString();

		// Compiler override
		compiler = (typeof opts.compiler === 'function') ? opts.compiler : defaultCompiler;

		// Compile
		try {
			compiled = compiler(contents, compilerOptions);
		} catch (err) {
			this.emit('error', new gutil.PluginError(PLUGIN_NAME, err, {
				fileName: file.path
			}));
			return next();
		}

		// https://nodejs.org/api/buffer.html
		file.contents = new Buffer(compiled);
		file.path = gutil.replaceExtension(file.path, '.js');

		// Next
		next(null, file);
	});
};