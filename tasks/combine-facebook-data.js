module.exports = function(grunt) {

  grunt.task.registerTask('combinefb', 'Combine all our Facebook data into a single file.', function() {

    var files = [
      'facebook_data.json',
      'facebook_data_two.json',
      'facebook_data_three.json',
      'facebook_data_four.json',
      'facebook_data_five.json'
    ];

    var combined = files.reduce(function(joined, file) {
      var singleJsonFile = grunt.file.readJSON(file);
      return joined.concat(singleJsonFile.data);
    }, []);

    grunt.file.write('facebook_data_combined.json', JSON.stringify(combined));
    grunt.log.oklns("Combined " + combined.length + " Facebook comments into facebook_data_combined.json");

  });

};
