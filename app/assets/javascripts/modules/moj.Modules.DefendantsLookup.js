moj.Modules.DefendantsLookup = {
  el: '.fx-defendant-lookup',
  init: function() {
    this.setInitState();
  },
  // View state logic used when page is loaded.
  setInitState: function() {

    var nextSeedNum = $('.fx-defendant-count tr').length + 1;

    $('.fx-add-defendant').prop('href', $('.fx-add-defendant').prop('href') + '?seedNum='+ nextSeedNum);

    $('.fx-defendant-count a:not(:last)').remove();

  },
}
