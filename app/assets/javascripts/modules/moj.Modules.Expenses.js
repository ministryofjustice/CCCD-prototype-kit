moj.Modules.Expenses = {
  el: '.fx-for-travel-hook',
  blocks: [],
  init: function() {
    var self = this;
    this.$el = $(this.el);

    this.$el.is(function(idx, el) {
      self.blocks.push(new moj.Modules.ExpensesBlock(el));
    })

    this.bindEvents();
  },
  bindEvents: function() {
    this.submitCtrl();
  },
  submitCtrl: function(){
    // Remove disabled attr from inputs before submit
    $('form').submit(function(e) {
      e.preventDefault();

      $('.fx-mileage').is(function(idx, el) {
        if (!$(el).is(':visible')) {
          $(el).remove();
        }
      })
      this.submit();
    });
  }

}
