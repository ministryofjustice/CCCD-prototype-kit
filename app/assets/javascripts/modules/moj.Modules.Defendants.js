moj.Modules.Defendants = {
  el: '.fx-defendant',
  init: function() {
    this.setInitState();
  },
  // View state logic used when page is loaded.
  setInitState: function() {
    var self = this;
    // Get a collection of all the Defendants and
    // apply the current display states based on the
    // firstname in this case.
    $(this.el).is(function(idx, el) {
      if($(this).find('.fx-defendant-hook').val()){
        $(el).removeClass('hidden');
      }
    });
  },
}
