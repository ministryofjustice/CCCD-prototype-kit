moj.Modules.OffenceDetails = {
  el: '',
  init: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    // Offence Category random chooser
    $.subscribe('general-select-offence-category-1', function(e, data) {
      $("select#general-select-offence-class-1").prop('selectedIndex', _.sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]));
    })
  }
}
