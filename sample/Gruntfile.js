module.exports = function(grunt){
	var matchdep = require('matchdep');
	matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// init config
	var config = {
		pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'files/css/style.css': 'files/css/src/style.scss'
        }
      }
    },
		styleguide: {
			styledocco: {
				options: {
					framework: {
						name: 'styledocco'
					},
					name: 'プロジェクトX',
          template: {
           include: ['files/css/src/doc-preview.js']
          }
				},
				src: [
          'files/css/**/*.scss',
          '!files/css/vendor/**/*.scss'
				],
        dest: 'files/doc'
			}
		},
    clean: ['<%= styleguide.styledocco.dest %>'],
		watch: {
			scss: {
				files: 'files/css/**/*.scss',
				tasks: ['clean', 'sass', 'styleguide']
			}
		}
	};

	// init
	grunt.initConfig(config);

	// resiter tasks
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['clean', 'sass', 'styleguide']);

};
