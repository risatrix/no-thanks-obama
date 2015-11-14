define(['marionette', 'itemviews/stream-item'], function(Mn, StreamItem) {

  'use strict';

  return Mn.CollectionView.extend({

    el: '#stream',

    collectionEvents: {
      'sync': 'render'
    },

    childView: StreamItem

  });

});
