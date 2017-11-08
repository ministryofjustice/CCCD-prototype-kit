moj.Modules.CaseDetails = {
  el: '',
  init: function() {
    this.bindEvents();
  },
  bindEvents: function() {

    // Subscribe to the select change event and show/hide the trial dates
    $.subscribe('general-select-case-type-1', function(e, data) {
      if (data.value === 'Trial') {
        $('.fx-trialdetails').show().removeClass('hidden');
        return
      }
      $('.fx-trialdetails').hide().addClass('hidden');
    });
  }
}
