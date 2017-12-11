moj.Modules.OffenceDetails = {
  el: '',
  init: function() {
    //this.bindEvents();
  },
  bindEvents: function() {
    // Offence Category random chooser
    $.subscribe('general-select-offence-category-1', function(e, data) {

      if(data.value === "Murder"){
        $("select#general-select-offence-class-1").prop('selectedIndex', _.sample([1]));
        return;
      }

      if(data.value === "Possession of offensive weapon"){
        $("select#general-select-offence-class-1").prop('selectedIndex', _.sample([8]));
        return;
      }

      $("select#general-select-offence-class-1").prop('selectedIndex', _.sample([2, 3, 4, 5, 6, 7, 9, 10, 11]));
    })
  }
}
