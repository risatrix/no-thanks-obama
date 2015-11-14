var stringify = require('csv-stringify');

module.exports = function(grunt) {

  grunt.task.registerTask('makecsv', 'Write our raw Twitter data to CSV for coding', function() {

    var done = this.async();

    var tweets = grunt.file.readJSON('twitter_data_combined.json');

    var filtered = tweets.filter(function(tweet) {
      return tweet.is_quote_status || tweet.in_reply_to_screen_name === 'TexasTribune';
    });

    var stripped = filtered.map(function(tweet) {
      return {
        text: tweet.text
      };
    });

    stringify(stripped, {quotedString: true}, function(err, output){
      grunt.file.write('for-coding.csv', output);
      grunt.log.oklns("Saved " + stripped.length + " rows of coding data to for-coding.csv");
      done();
    });

  });

};
