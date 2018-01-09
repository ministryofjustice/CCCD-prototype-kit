moj.Modules.AddAnother = {
  init: function() {
    $('.fx-addmore').on('click', '.button, a', function(e) {

      var selector = $(e.delegateTarget).data('selector');
      console.log(selector);
      $($(selector).not(':visible')[0]).removeClass('hidden');

      if (!($(selector).not(':visible')[0])) {
        $('.fx-addmore').remove()
        $('.fx-duplicate').remove()
      }

    });
  }
}
