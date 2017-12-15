moj.Modules.Form = {
  el: 'form',
  init: function () {
    this.$el = $(this.el);
    this.$el.is(function(idx, el){
      if(!!~document.referrer.indexOf('cost-summary')){
        $(el).attr('action', './cost-summary')
      }
    });
  }
}
