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
  // View state logic used when page is loaded.
  setInitState: function() {
    var self = this;
    // Get a collection of all the Misc Fees and
    // apply the current display states
    $(this.el).is(function(idx, el) {
      var $el = $(el);
      var $select = $el.find('select');

      // Handel typeahead instances
      if(!$select.length){
        $select = $el.find('.tt-input');
      }

      if (!!$select.val()) {
        $el.removeClass('hidden');

        if (self.checkTrigger($select.val())) {
          $select.change()
        }
      }
    });
  },
  // Event bining
  bindEvents: function() {
    var self = this;

    // Bind on the select change event to show the `.el-input`
    this.$el.on('change', 'select', function(e) {

      // `.el-input` is the entire input field hook
      var $elInput = $(e.delegateTarget).find('.el-input');

      // Show if the correct value is selected in the dropdown
      if (self.checkTrigger(this.value)) {
        $elInput.removeClass('hidden');
        return;
      }

      // Fall through to hide and clear the input value
      $elInput.addClass('hidden');
      $elInput.find('input').val('');

    });
  },

  // A util method to enable / disable the
  // `.fx-misc-fee-input`
  checkTrigger: function(string) {
    return !!~this.triggers.indexOf(string);
  }
}
