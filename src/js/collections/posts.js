define(['backbone', 'underscore', 'lunr', 'models/post'], function(Backbone, _, lunr, Post) {

  'use strict';

  return Backbone.Collection.extend({

    initialize: function() {
      this._idx = lunr(function () {
        this.ref('id');
        this.field('text', {boost: 10});
        this.field('user');
      });
    },

    parse: function(response) {
      _.each(response, function(post) {
        var toIndex = {
          text: post.text,
          id: post.id
        };

        if(post.hasOwnProperty('user')) {
          toIndex.user = post.user.name;
        }

        this._idx.add(toIndex);
      }, this);

      return response;
    },

    search: function(query) {
      var results = this._idx.search(query),
          ids = _.pluck(results, 'ref');

      this.forEach(function(model) {
        var found = ids.indexOf(model.id) !== -1;
        model.set('show', found, {silent: true});
        if(found) {
          model.set('score', _.findWhere(results, function(results) {
            return results.ref === model.id;
          }).score);
        }
      });

      this.comparator = function(model) {
        return model.get('score');
      };
      this.sort();

      this.trigger('filtered');
    },

    model: Post,

    url: 'data.json'

  });

});
