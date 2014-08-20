module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: {
          'build/application.min.js' : [ 'src/*.js' ]
        }
      }
    },
    exec: {
      launch: {
        cmd: function() {
          return 'open http://local.grunt';
        }
      }
    },

   jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'src/{,**/}*.js',
        '!src/{,**/}*.min.js',
        '!**/node_modules/**',
        '!Gruntfile.js'
      ]
    },

    watch: {
      scripts: {
        files: ['src/*.js', '*.php', '*.html'],
        tasks: ['jshint', 'uglify'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
    }
  });

  // Load the plugin that provides the "uglify" task.
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', 'Starts a development server', function() {

    var launch = grunt.option('launch');

    grunt.task.run(['uglify']);

    if (launch) {
      grunt.task.run('exec:launch');
    }
    grunt.task.run(['watch']);
  });

};
