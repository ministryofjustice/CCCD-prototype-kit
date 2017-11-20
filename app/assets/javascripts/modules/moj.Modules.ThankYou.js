moj.Modules.Thankyou = {
  el: '.module-thankyou',
  init: function() {
    if($(this.el).length){
      this.bindEvents();
    }
  },
  bindEvents: function() {
    $('.button-secondary').on('click', function(e){
      e.preventDefault();

      if(window.scheme === "LGFS"){
        window.location = '../bill-type';
        return;
      }

      window.location = '../all-claims-list';

    });
  }
}
