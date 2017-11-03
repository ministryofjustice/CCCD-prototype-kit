moj.Modules.inputs = {
  el: '.el-input',
  init: function () {
    this.$el = $('.el-input');

    this.$el.is(function(){
      var $el = $(this);
    });
  }
}
