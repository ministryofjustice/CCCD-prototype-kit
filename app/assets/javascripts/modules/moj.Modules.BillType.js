moj.Modules.BillType = {
  el: '#fx-bill-type',

  init: function() {
    this.$el = $(this.el);
    if (this.$el.length) {
      this.bindEvents()
    }
  },
  bindEvents: function() {
    // /examples/lgfs/
    // Change the `action` attr on the form for LGFS bill types
    $('#fx-bill-type').on('change', 'input', this.changeCallback);
  },
  changeCallback: function(e) {
    var val = $('input[name=general-radio-group-choose-your-bill-type-1]:checked', 'form').val();
    var $form = $("#fx-form-bill-type");
    switch (val) {
      case 'Litigator final fee':
        $form.attr("action", "/examples/lgfs/final/case-details");
        break;
      case 'Litigator interim fee':
        $form.attr("action", "/examples/lgfs/final/case-details/interim/");
        break;
      case 'Litigator transfer fee':
        $form.attr("action", "/examples/lgfs/final/case-details/transfer/");
        break;
      default:
        alert('switch fell')
        break;
    }
  }
}
