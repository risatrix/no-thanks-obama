require([
  'jquery',
  'collections/posts',
  'collectionviews/stream.js',
  'views/search'
], function($, Posts, Stream, Search) {

  'use strict';

  $(function() {

    window.p = new Posts();

    p.fetch();

    new Search({
      collection: p
    });

    window.stream = new Stream({
      collection: p
    });

  });

});
