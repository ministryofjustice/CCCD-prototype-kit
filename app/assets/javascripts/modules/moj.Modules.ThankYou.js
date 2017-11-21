moj.Modules.ThankYou = {
  el: '.module-thankyou',
  init: function() {
    if($(this.el).length){
      this.bindEvents();
    }
  },
  bindEvents: function() {
    $('.button-secondary').on('click', function(e){
      e.preventDefault();
      window.location = '/prototype-admin/clear-data';
    });
  }
}
