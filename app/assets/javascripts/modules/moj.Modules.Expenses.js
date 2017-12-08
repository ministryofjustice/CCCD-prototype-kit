moj.Modules.Expenses = {
  el: '.fx-for-travel-hook',
  blocks: [],
  init: function() {
    var self = this;

    $(this.el).is(function(idx, el){
      self.blocks.push(new moj.Modules.ExpensesBlock(el))
    })

  }
}
