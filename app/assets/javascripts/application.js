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
  GOVUK.stickAtTopWhenScrolling.init();
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


  var x = $("#offence-category").depdrop({
    depends: ['offence-class'],
    url: '/public/javascripts/data/scheme-9-offences/categories',
    loadingText: '',
    parentParam: 'offence_class',

  });

  moj.init();
});


//SIMON

$(document).on('click', '.button-add-another', function(e) {
  var beforeThis = $(this).parents('form > .grid-row');
  e.preventDefault();
  insertFields(beforeThis);
  sortFields();
});

$(document).on('click', '.remove-list-item', function(e) {
  e.preventDefault();
  $(this).parents('.list-item-wrapper').remove();
  sortFields();
});

function insertFields(element) {
  element.before(
    '<div class="grid-row">' +
    '<div class="form-group-compound list-item-wrapper">' +
    '<h2 class="heading-medium">Item 1</h2>' +
    '<fieldset>' +
    '<div class="column-one-third no-padding">' +
    '<div class="form-group list-item">' +
    '<label class="form-label" for="field-x">' +
    'Field label' +
    '</label>' +
    '<input type="text" class="form-control" id="field-x" name="field-x">' +
    '</div>' +
    '</div>' +
    '<div class="column-one-third no-padding">' +
    '<div class="form-group list-item">' +
    '<label class="form-label" for="field-x">' +
    'Field label' +
    '</label>' +
    '<input type="text" class="form-control" id="field-x" name="field-x">' +
    '</div>' +
    '</div>' +
    '<div class="column-one-third no-padding">' +
    '<div class="list-item">' +
    '</div>' +
    '</div>' +
    '</fieldset>' +
    '<hr />' +
    '</div>' +
    '</div>'
  );
}

function sortFields() {
  var listCounter = 1;
  var inputCounter = 1;

  $(document).find('.list-item-wrapper').each(function() {
    $(this).find('h2').text('Item ' + listCounter);

    if ($(this).find('.remove-list-item').length === 0) {
      $(this).find('.list-item:last').append('<a id="remove-item-' + listCounter + '" class="remove-list-item" href="#">Remove this</a>');
    } else {
      $(this).find('.remove-list-item').attr('id', 'remove-item-' + listCounter);
    }

    $(this).find('.list-item').children('label').each(function() {
      $(this).attr('for', 'field-' + inputCounter);
      inputCounter++;
    });

    $(this).find('.list-item').children('input').each(function() {
      var labelNo = $(this).parent().find('label').attr('for').split('-').pop();
      $(this).attr('id', 'field-' + labelNo);
      $(this).attr('name', 'field-' + labelNo);
    });

    listCounter++;
  });

  if ($(document).find('.list-item-wrapper').length === 1) {
    $('.remove-list-item').remove();
  }
}



// ---------------------------------------
// Accordion JS
// ---------------------------------------

if ('addEventListener' in document && document.querySelectorAll) {

  document.addEventListener('DOMContentLoaded', function() {

    var accordions = document.querySelectorAll('.accordion')

    for (var i = accordions.length - 1; i >= 0; i--) {
      new Accordion(accordions[i])
    };

  })
}
