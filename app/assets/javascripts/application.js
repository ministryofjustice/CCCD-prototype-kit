/* global $ */
/* global GOVUK */
/* jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL */

(function($) {
  Number.prototype.pad = function(size) {

    var s = String(this);
    while (s.length < (size || 2)) {
      s = "0" + s;
    }
    return s;
  }

  var o = $({});

  $.subscribe = function() {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function() {
    o.off.apply(o, arguments);
  };

  $.publish = function() {
    // console.log('pub', arguments);
    o.trigger.apply(o, arguments);
  };

}(jQuery));

window.scheme = !!~window.location.pathname.indexOf('/lgfs/') ? 'LGFS' : 'AGFS';

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

  // Trigger fake expense show when page reloads
  if ($('.fx-for-travel-hook select').val()) {
    $('.fx-for-travel-hook select').trigger('change');
  }

  // Populate the date fields with todays date
  $('.fx-populate').is(function(idx, el) {
    var $el = $(el);
    var contextid = $el.data('contextid');
    var date = new Date();
    $el.find('#' + contextid + '-day').val((date.getDay()).pad(2));
    $el.find('#' + contextid + '-month').val((date.getMonth()).pad(2));
    $el.find('#' + contextid + '-year').val(date.getFullYear());
  });





  moj.init();

});
