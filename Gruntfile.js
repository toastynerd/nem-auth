'use strict';

module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          retporter: 'spec'
        },
        src: ['test/mocha/**/*-test.js']
      }
    },

    watch: {
      unittest: {
        files: ['lib/**/*.js', 'test/unit/**/*.js', 'Gruntfile.js', 'package.json'],
        tasks: ['simplemocha:unit']
      },

      spectest: {
        files: ['lib/**/*.js', 'test/spec/**/*.js', 'Gruntfile.js', 'package.json'],
        tasks: ['simplemocha:spec']
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: {
        tasks: ['watch:unittest', 'watch:spectest']
      }
    }
  });

  grunt.registerTask('autotest', ['mochaTest',
                                      'concurrent:dev']);
}
