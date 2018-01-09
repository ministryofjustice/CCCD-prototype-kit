moj.Modules.GradFee = {
  // Misc fee top level selector
  el: '.fx-grad-fee',

  init: function() {
    // cache a $() referance
    this.$el = $(this.el);

    // Bind the events
    this.bindEvents();

    // Show the hidden fees with a Fee type filled in
    this.setInitState();

  },
  // View state logic used when page is loaded.
  setInitState: function() {
    var self = this;

    $('.panel.fx-init').is(function(idx, el){
      var $this = $(this);
      var selector = $this.find('.fx-addmore').data();
      $this.find(selector.selector).is(function(idx, el){
        if($(el).find('input').first().val()){
          $(el).removeClass('hidden');
        }
      });
    });
  },
  //  Event bining
  bindEvents: function() {
    var self = this;

  }
}
