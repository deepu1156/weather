/*
*	Grunt based build file for front-end code
*/
module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			dist: {
				options: {
					transform: [
						["babelify", {
							"presets": ["react"]
						}]
					]
				},
				files: {
					"./src/main/webapp/build/bundle.js": ["./src/main/webapp/js/main.js"]
				}
			}
		},
		watch: {
			scripts: {
				files: ["./src/main/webapp/js/*.js"],
				tasks: ["browserify"]
			}
		}
	});
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("default", ["watch"]);
	grunt.registerTask("build", ["browserify"]);
};