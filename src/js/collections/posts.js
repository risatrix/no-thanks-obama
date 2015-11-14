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
      return this._idx.search(query);
    },

    model: Post,

    url: 'data.json'

  });

});
