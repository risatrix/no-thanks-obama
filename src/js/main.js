require([
  'jquery',
  'collections/posts',
  'collectionviews/stream.js',
  'collectionviews/filters.js',
  'views/search'
], function($, Posts, Stream, Filters, Search) {

  'use strict';

  $(function() {

    window.p = new Posts();

    p.fetch();

    new Search({
      collection: p
    });

    new Filters({
      collection: p
    });

    window.stream = new Stream({
      collection: p
    });

  });

});
