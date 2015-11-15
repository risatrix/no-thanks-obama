define(['marionette'], function(Mn) {

  'use strict';

  return Mn.CollectionView.extend({

    el: '#filters',

    events: {
      'change #network-filter': 'networkFilter'
    },

    networkFilter: function() {
      var network = this.$('#network-filter').val();

      if(network === 'reset') {
        this.collection.clear();
      }
      else {
        this.collection.filterByNetwork(network);
      }
    }

  });

});
