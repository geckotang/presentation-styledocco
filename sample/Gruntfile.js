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
          'htdocs/css/style.css': 'htdocs/css/src/style.scss'
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
           include: ['htdocs/css/src/doc-preview.js']
          }
				},
				src: [
          'htdocs/css/**/*.scss',
          '!htdocs/css/vendor/**/*.scss'
				],
        dest: 'htdocs/_doc'
			}
		},
    clean: ['<%= styleguide.styledocco.dest %>'],
		watch: {
			scss: {
				files: 'htdocs/css/**/*.scss',
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
