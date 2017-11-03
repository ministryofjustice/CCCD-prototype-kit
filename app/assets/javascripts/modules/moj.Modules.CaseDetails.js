moj.Modules.CaseDetails = {
  el: '',

  init: function() {
    $.subscribe('general-select-case-type-1', function(e, data){
      $('.fx-trialdetails').show().removeClass('hidden');
    });
  },
  bindEvents: function() {

  }
}
