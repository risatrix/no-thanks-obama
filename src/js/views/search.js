define(['backbone', 'underscore'], function(Backbone, _) {

  'use strict';

  return Backbone.View.extend({

    el: '#search',

    events: {
      'input #search-box': 'doSearch'
    },

    doSearch: _.debounce(function(e) {
      this.collection.search(this.$('#search-box').val());
    }, 300)

  });

});
