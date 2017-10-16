/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function() {
  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Show and hide toggled content
  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()
})


$(document).ready(function() {
  $('#fx-bill-type').on('change', 'input', function(e) {
    var val = $('input[name=radio-group-choose-your-bill-type]:checked', 'form').val();
    var $form = $("#fx-form-bill-type");
    switch (val) {
      case 'Litigator final fee':
        $form.attr("action", $form.attr("action") + "final/");
        break;
      case 'Litigator interim fee':
        $form.attr("action", $form.attr("action") + "interim/");
        break;
      case 'Litigator transfer fee':
        $form.attr("action", $form.attr("action") + "transfer/");
        break;
      default:
        alert('switch fell')
        break;
    }
  })
});
