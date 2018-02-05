moj.Modules.AddAnother = {
  init: function() {
    $('.fx-addmore').on('click', '.button, a', function(e) {

      var selector = $(e.delegateTarget).data('selector');
      var $parent = $(e.delegateTarget).parent();
      $($(selector).not(':visible')[0]).removeClass('hidden');

      if (!($(selector).not(':visible')[0])) {
        $parent.find('.fx-addmore').remove();
        $parent.find('.fx-duplicate').remove();
      }

    });
  }
}
