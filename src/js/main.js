require(['jquery', 'collections/posts', 'collectionviews/stream.js'], function($, Posts, Stream) {

  'use strict';

  $(function() {

    window.p = new Posts();

    p.fetch();

    window.stream = new Stream({
      collection: p
    });

  });

});
