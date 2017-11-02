moj.Modules.MiscFee = {
  // Misc fee top level selector
  el: '.fx-misc-fee',
  triggers: ['Case uplift'],
  init: function() {
    // cache a $() referance
    this.$el = $(this.el);

    // Bind the events
    this.bindEvents();

    // Show the hidden fees with a Fee type filled in
    this.setInitState();

  },
  setInitState: function() {
    var self = this;
    // Get a collection of all the Misc Fees and
    // apply the current display states
    $(this.el).is(function(idx, el) {

      var $el = $(el);

      var $select = $el.find('select');

      if (!!$select.val()) {

        $el.removeClass('hidden');

        if (self.checkTrigger($select.val())) {
          $select.change()
        }
      }
    });
  },
  bindEvents: function() {
    var self = this;
    this.$el.on('change', 'select', function(e) {

      var $input = $(e.delegateTarget).find('.fx-misc-fee-input');

      if (self.checkTrigger(this.value)) {
        $input.removeClass('disabled').attr('disabled', false);
        return;
      }

      $input.addClass('disabled').attr('disabled', true).val('');
    });
  },

  // A util method to enable / disable the
  // `.fx-misc-fee-input`
  checkTrigger: function(string) {
    return !!~this.triggers.indexOf(string);
  }
}
