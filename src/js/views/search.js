define(['backbone', 'underscore'], function(Backbone, _) {

  'use strict';

  return Backbone.View.extend({

    el: '#search',

    events: {
      'input #search-box': 'doSearch'
    },

    doSearch: _.debounce(function(e) {
      var query = this.$('#search-box').val();

      if(query !== '') {
        this.collection.search(query);
      }
      else {
        this.collection.clear();
      }

    }, 300)

  });

});
