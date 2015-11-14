module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    requirejs: {
      client: {
        options: {
          baseUrl: 'src/js',
          mainConfigFile: 'src/js/config.js',
          out: 'public/scripts.js',
          optimize: 'uglify2',
          include: ['config', 'main'],
          name: '../../bower_components/almond/almond',
          generateSourceMaps: true,
          preserveLicenseComments: false
        }
      }
    },

    connect: {
      options: {
        keepalive: true,
        open: true,
        base: 'public/'
      },
      dev: {}
    }
  });

  grunt.loadTasks('./tasks');

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');

};
