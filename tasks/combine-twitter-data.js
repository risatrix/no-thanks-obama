module.exports = function(grunt) {

  grunt.task.registerTask('combinetweets', 'Combine all our Twitter data into a single file.', function() {

    var files = [
      'twitter_data.json',
      'twitter_data_two.json',
      'twitter_data_three.json',
      'twitter_data_four.json',
      'twitter_data_five.json'
    ];

    var combined = files.reduce(function(joined, file) {
      var singleJsonFile = grunt.file.readJSON(file);
      return joined.concat(singleJsonFile);
    }, []);

    grunt.file.write('twitter_data_combined.json', JSON.stringify(combined));
    grunt.log.oklns("Combined " + combined.length + " tweets into twitter_data_combined.json");

  });

};
