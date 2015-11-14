module.exports = function(grunt) {

  grunt.task.registerTask('combinefb', 'Combine all our Facebook data into a single file.', function() {

    var files = [
      'src/data/facebook_data.json',
      'src/data/facebook_data_two.json',
      'src/data/facebook_data_three.json',
      'src/data/facebook_data_four.json',
      'src/data/facebook_data_five.json'
    ];

    var combined = files.reduce(function(joined, file) {
      var singleJsonFile = grunt.file.readJSON(file);
      return joined.concat(singleJsonFile.data);
    }, []);

    grunt.file.write('build/data/facebook_data_combined.json', JSON.stringify(combined));
    grunt.log.oklns("Combined " + combined.length + " Facebook comments into facebook_data_combined.json");

  });

};
