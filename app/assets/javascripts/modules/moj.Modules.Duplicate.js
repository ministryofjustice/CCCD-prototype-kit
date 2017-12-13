moj.Modules.Duplicate = {
  el: '',
  init: function() {
    var self = this;

    $('.fx-duplicate').on('click', function(e) {
      var seed = self.getCount();

      if($("#general-select-expense-type-" + seed).prop('selectedIndex')){
        self.copyValues(seed)
      }
    });
  },
  getCount: function() {
    return $('.fx-for-travel-hook:visible').length;
  },

  // Needs a refactor
  copyValues: function(seed) {
    var dest = seed+1;
    $("#general-select-expense-type-" + dest).prop('selectedIndex', $("#general-select-expense-type-" + seed).prop('selectedIndex')).change();

    $("#general-select-reason-for-travel-" + dest).prop('selectedIndex', $("#general-select-reason-for-travel-" + seed).prop('selectedIndex')).change();

    $("#general-input-destination-" + dest).val($("#general-input-destination-" + seed).val())
    $("#general-input-distance-in-miles-" + dest).val($("#general-input-distance-in-miles-" + seed).val())
    $("#travel-expenses-input-net-amount-" + dest).val($("#travel-expenses-input-net-amount-" + seed).val())
    $("#travel-expenses-input-vat-amount-" + dest).val($("#travel-expenses-input-vat-amount-" + seed).val())

    $("#general-cpm-cost-per-mile-" + dest + "-1").prop('checked', $("#general-cpm-cost-per-mile-" + seed + "-1").prop('checked'))
    $("#general-cpm-cost-per-mile-" + dest + "-2").prop('checked', $("#general-cpm-cost-per-mile-" + seed + "-2").prop('checked'))

    $('.fx-addmore input').click();

    if(dest == 5){
      $('.fx-duplicate').show(false);
    }
  }
}
