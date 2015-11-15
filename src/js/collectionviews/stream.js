define(['marionette', 'itemviews/stream-item-fb', 'itemviews/stream-item-tw'], function(Mn, StreamItemFb, StreamItemTw) {

  'use strict';

  return Mn.CollectionView.extend({

    el: '#stream',

    collectionEvents: {
      'sync': 'render',
      'filtered': 'render'
    },

    filter: function(model) {
      return model.get('show');
    },

    getChildView: function(post) {
      if(post.get('network') === 'fb') {
        return StreamItemFb;
      }
      else {
        return StreamItemTw;
      }
    }

  });

});
