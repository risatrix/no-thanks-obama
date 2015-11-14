require(['jquery', 'collections/posts', 'collectionviews/stream.js'], function($, Posts, Stream) {

  'use strict';

  $(function() {

    window.p = new Posts();

    window.stream = new Stream({
      el: '#stream',
      collection: p
    });

    p.fetch({
      success: function() {
        stream.render();
      }
    });

  });

});
