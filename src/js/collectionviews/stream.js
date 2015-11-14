define(['marionette', 'itemviews/stream-item'], function(Mn, StreamItem) {

  'use strict';

  return Mn.CollectionView.extend({

    childView: StreamItem

  });

})
