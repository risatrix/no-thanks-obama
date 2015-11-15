module.exports = function(grunt) {

  grunt.task.registerTask('appdata', 'Make the data files for our static app.', function() {

    /**
     * Get and build the Facebook data
     */
    var fbData = grunt.file.readJSON('build/data/facebook_data_combined.json');

    var fbPostsWithComments = fbData.filter(function(post) {
      return post.hasOwnProperty('comments');
    });

    var hydaredComments = fbPostsWithComments.map(function(post) {
      post.comments.data = post.comments.data.map(function(comment) {
        comment.post_id = post.id;
        comment.post_img = post.icon;

        if(post.message) {
          comment.post_text = post.message.substring(0, 60);
          if(comment.post_text.length < post.message.length) {
            comment.post_text += '...';
          }
        }
        else {
          comment.post_text = post.story;
        }

        return comment;
      });
      return post;
    });

    var fbPostCommentData = fbPostsWithComments.reduce(function(combined, post) {
      return combined.concat(post.comments.data);
    }, []);

    fbPostCommentData = fbPostCommentData.slice(0, 100);

    var appPostData = fbPostCommentData.map(function(post) {

      // Make the permalink
      var postId = post.post_id.split('_')[1],
          commentId = post.id.split('_')[1],
          permalink = 'https://www.facebook.com/texastribune/posts/' + postId +
                      '?comment_id=' + commentId;

      return {
        network: 'fb',
        question: post.message.indexOf('?') !== -1,
        id: post.id,
        text: post.message,
        url: permalink,
        user: post.from,
        likes: post.like_count,
        time: post.created_time,
        post: {
          id: post.post_id,
          text: post.post_text,
          img: post.post_img
        }
      };
    });

    /**
     * Get and build the Facebook data
     */
    var twData = grunt.file.readJSON('build/data/twitter_data_combined.json');

    twData = twData.slice(0, 100);

    var twAppPostData = twData.map(function(tweet) {
      return {
        network: 'tw',
        question: tweet.text.indexOf('?') !== -1,
        id: tweet.id_str,
        text: tweet.text,
        url: 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str,
        user: {
          name: tweet.user.name,
          screen_name: tweet.user.screen_name
        },
        favs: tweet.favorite_count,
        rts: tweet.retweet_count,
        time: tweet.created_at
      };
    });

    joinedData = appPostData.concat(twAppPostData).sort(function(post) {
      return new Date(post.time);
    });

    joinedData = joinedData.slice(0, 25);

    grunt.file.write('public/data.json', JSON.stringify(joinedData));
    grunt.log.oklns("Wrote " + joinedData.length + " Facebook posts to data.json");

  });

};
