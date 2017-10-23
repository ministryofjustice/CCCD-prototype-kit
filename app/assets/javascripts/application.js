/* global $ */
/* global GOVUK */
/* jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL */

(function($) {

  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    o.trigger.apply(o, arguments);
  };

}(jQuery));

window.scheme = window.location.pathname.indexOf('/lgfs/') ? 'LGFS' : 'AGFS';

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
        $form.attr("action", window.location.pathname + "final/");
        break;
      case 'Litigator interim fee':
        $form.attr("action", window.location.pathname + "interim/");
        break;
      case 'Litigator transfer fee':
        $form.attr("action", window.location.pathname + "transfer/");
        break;
      default:
        alert('switch fell')
        break;
    }
  })

  $('body').on('typeahead:change', function(e, value) {
    var fxname = $(e.target).attr('name');
    $.publish(fxname, {
      value: value
    })
  })

  // Offence Category random chooser
  $.subscribe('select-box-offence-category', function(e, data) {
    $("select#select-box-offence-class").prop('selectedIndex', _.sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]));
  })

  $('form').submit(function(e) {
    e.preventDefault();
    $('select:disabled').prop('disabled', false);
    this.submit();
  });

  $('.fx-form-buttons a').on('click', function(e){
    e.preventDefault();
    $('form').submit();
  });
});
