define(['backbone', 'underscore', 'lunr', 'models/post'], function(Backbone, _, lunr, Post) {

  'use strict';

  return Backbone.Collection.extend({

    initialize: function() {
      this._idx = lunr(function () {
        this.ref('id');
        this.field('text');
      });
    },

    parse: function(response) {
      _.each(response, function(post) {
        if(post.network === 'fb') {
          this._idx.add({
            text: post.text,
            id: post.id
          });
        }
      }, this);

      response = _.map(response, function(model) {
        model.time = new Date(model.time);
        return model;
      });

      return response;
    },

    clear: function() {
      this.forEach(function(model) {
        model.set('show', true);
      });
      this.comparator = function(model) {
        return -model.get('time');
      };
      this.sort();
      this.trigger('filtered');
    },

    filterByNetwork: function(network) {
      this.forEach(function(model) {
        model.set('show', model.get('network') === network, {silent: true});
      });

      this.trigger('filtered');
    },

    search: function(query) {
      var results = this._idx.search(query),
          topResults = results.slice(0, 20),
          ids = _.pluck(topResults, 'ref');

      this.forEach(function(model) {
        var found = ids.indexOf(model.id) !== -1;
        model.set('show', found, {silent: true});
      });

      this.trigger('filtered');
    },

    model: Post,

    url: 'data.json'

  });

});
