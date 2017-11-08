moj.Modules.TypeAhead = {
  el: '.fx-typeahead',

  init: function() {

    this.$el = $(this.el);

    this.bindEvents();

    this.publishValue();

  },

  bindEvents: function() {
    // Broadcast the `typeahead:change` event
    // Publish the attr name + the value
    $('body').on('typeahead:change', function(e, value) {
      var fxname = $(e.target).attr('name');
      $.publish(fxname, {
        value: value
      })
    });

  },

  publishValue: function(){
    this.$el.is(function(idz, el){
      var $el = $(el);

      if($el.find('.tt-input').val()){
        console.log('send the message');
        $el.find('.tt-input').trigger('typeahead:change', $el.find('.tt-input').val());
      }

    });
  }
}
