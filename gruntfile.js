module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		locales: {
			src: "dev/",
			dest: "build/"
		},
		concat: {
			option:{

			},
			all: {
				src: "dev/**/*.min.js",
				dest: "build/main.min.js"
			}
		},
		concat_css: {
			all: {
				src: ["dev/**/*.min.css"],
				dest: "build/main.min.css"
			}
		},
		connect: {
			server: {
				options: {
					base: "",
					keepalive: false
				}
			},
			start: {
				options: {
					base: "",
					keepalive: true
				}
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: "dev/",
				src: ['**/*.css', '!**/*.min.css'],
				dest: './',
				ext: '.min.css'
			}
		},
		jshint: {
			options: {
				force: false
			},
			files: ['dev/**/*.js, !dev/**/*.min.js']
		},
		uglify: {
			build: {
				options: {

				},
				files: [{
					expand: true,
					cwd: 'dev/',
					src: ['**/*.js','!**/*.min.js'],
					dest: 'build/',
					ext: '.min.js'
				}]
			}
		},
		watch: {
			livereload: {
				options: {
					livereload: true,
				},
				files: ['*']
			},
			concat: {
				files: ['dev/**/*.min.js'],
				tasks: ['concat:all']
			},
			concat_css: {
				files: ['dev/**/*.min.css'],
				tasks: ['concat_css:all']
			},
			cssmin: {
				files: ['dev/**/*.css','!dev/**/*.min.css'],
				tasks: ['cssmin:minifiy']
			},
			uglify: {
				files: ['dev/**/*.js','!dev/**/*.min.js'],
				tasks: ['uglify:build']
			}
		}
	});

	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('start', ['connect:start']);
	grunt.registerTask('dev', ['connect:server','watch']);
};