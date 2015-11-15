define(['marionette'], function(Mn) {

  'use strict';

  return Mn.ItemView.extend({

    events: {
      'click .btn-flag': 'hide',
      'click .btn-hide': 'hide'
    },

    hide: function(e) {
      e.preventDefault();
      this.$el.slideUp(300, function() {
        this.model.destroy();
      }.bind(this));
    },

    template: '#tpl-stream-item-tw'

  });

});
