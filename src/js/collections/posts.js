define(['backbone', 'models/post'], function(Backbone, Post) {

  'use strict';

  return Backbone.Collection.extend({

    model: Post,

    url: 'data.json'

  });

});
