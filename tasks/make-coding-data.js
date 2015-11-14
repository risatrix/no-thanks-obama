var stringify = require('csv-stringify');

/**
 * Check to see if a tweet contains a mention for the
 * passed handle as the first thing in the tweet
 * @see https://dev.twitter.com/rest/reference/get/statuses/mentions_timeline
 *
 * @param {object} tweet - the tweet object to check;
 *   basically it's just a single Tweet from the JSON
 *   API response from the statuses/mentions_timeline
 *   endpoint
 * @param {string} handle - the handle to check for
 * @param {boolaen} - returns true if the handle is
 *   mentioned at the beginning of the tweet
 */
function mentionAtStart(tweet, handle) {
  var found = false;
  tweet.entities.user_mentions.forEach(function(mention) {
    if(mention.screen_name === handle && mention.indices[0] === 0) {
      found = true;
    }
  });
  return found;
}

module.exports = function(grunt) {

  grunt.task.registerTask('codingdata', 'Write our raw social data to CSV for coding', function() {

    var done = this.async();

    /**
     * Filter our tweets to replices, clear mentions and quotes
     * then reduce them all to an array that only contains our
     * Tweet text
     */
    /*
    var tweets = grunt.file.readJSON('twitter_data_combined.json');

    var filtered = tweets.filter(function(tweet) {
      return tweet.is_quote_status || tweet.in_reply_to_screen_name === 'TexasTribune' || mentionAtStart(tweet, 'TexasTribune');
    });

    var stripped = filtered.map(function(tweet) {
      return {
        text: tweet.text
      };
    });
    */

    /**
     * Filter our Facebook posts to an array with the comments from
     * each post
     */
    var fbPosts = grunt.file.readJSON('facebook_data_combined.json');

    var fbPostsWithComments = fbPosts.filter(function(post) {
      return post.hasOwnProperty('comments');
    });

    var fbPostCommentData = fbPostsWithComments.reduce(function(combined, post) {
      return combined.concat(post.comments.data);
    }, []);

    var fbPostCommentText = fbPostCommentData.map(function(comment) {
      return {
        text: comment.message
      };
    });

    /**
     * Save the combined data for both social networks
     */
    // var combined = stripped.concat(fbPostCommentText);

    fbPostCommentText = fbPostCommentText.slice(0, 100);

    stringify(fbPostCommentText, {
      quotedString: true,
      header: true,
      columns: ['text', 'code']
    }, function(err, output){
      grunt.file.write('for-coding.csv', output);
      grunt.log.oklns("Saved " + fbPostCommentText.length + " rows of coding data to for-coding.csv");
      done();
    });

  });

};
