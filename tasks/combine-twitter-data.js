module.exports = function(grunt) {

  grunt.task.registerTask('combinetweets', 'Combine all our Twitter data into a single file.', function() {

    var files = [
      'src/data/twitter_data.json',
      'src/data/twitter_data_two.json',
      'src/data/twitter_data_three.json',
      'src/data/twitter_data_four.json',
      'src/data/twitter_data_five.json'
    ];

    var combined = files.reduce(function(joined, file) {
      var singleJsonFile = grunt.file.readJSON(file);
      return joined.concat(singleJsonFile);
    }, []);

    grunt.file.write('build/data/twitter_data_combined.json', JSON.stringify(combined));
    grunt.log.oklns("Combined " + combined.length + " tweets into build/data/twitter_data_combined.json");

  });

};
