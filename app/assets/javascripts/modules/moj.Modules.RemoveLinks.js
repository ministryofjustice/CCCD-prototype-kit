moj.Modules.RemoveLinks = {
  el: '.fx-remove-link',
  init: function() {

    $('.fx-duplicate').on('click', '.button', function(e) {
      var selector = $(e.delegateTarget).data('selector');

      $($(selector).not(':visible')[0]).removeClass('hidden');

      if (!($(selector).not(':visible')[0])) {
        $('.fx-duplicate').remove()
      }

    });
  }
}
