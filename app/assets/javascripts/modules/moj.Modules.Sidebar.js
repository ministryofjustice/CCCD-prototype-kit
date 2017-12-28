moj.Modules.SideBar = {
  el: '.fx-sidebar',
  init: function() {
    this.$el = $(this.el);

    var values = [];
    this.$el.find('.numeric').is(function(idx, el){
      var amount = moneyFormatter.format('GBP', $(this).text());
      values.push(parseFloat($(this).text()));
      $(this).text(amount)
    })

    var total = values.reduce(function(a,b){
      return a+b;
    });

    this.$el.find('.fx-sidebar-total span').text(moneyFormatter.format('GBP', total))

    if(this.$el.length){
      this.bindEvents();
    }
  },
  bindEvents: function(){

  }
}
