var natural = require('natural');

/*
function hasQuestionWords(text) {
  var tokenizer = new natural.TreebankWordTokenizer(),
      tokens = tokenizer.tokenize(text);

  console.log(tokens);
}
*/

module.exports = function(grunt) {

  grunt.task.registerTask('appdata', 'Make the data files for our static app.', function() {

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

    fbPostCommentData = fbPostCommentData.slice(0, 50);

    var appPostData = fbPostCommentData.map(function(post) {

      // Make the permalink
      var postId = post.post_id.split('_')[1],
          commentId = post.id.split('_')[1],
          permalink = 'https://www.facebook.com/texastribune/posts/' + postId +
                      '?comment_id=' + commentId;

      return {
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

    grunt.file.write('public/data.json', JSON.stringify(appPostData));
    grunt.log.oklns("Wrote " + appPostData.length + " Facebook posts to data.json");

  });

};
