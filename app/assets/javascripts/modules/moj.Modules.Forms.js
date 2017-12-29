moj.Modules.Form = {
  el: 'form.fx-form',
  init: function() {

    this.$el = $(this.el);
    if (!!this.$el.length) {
      this.bindEvents();
      this.setActionPath();
    }
  },
  bindEvents: function() {
    var self = this;


    var reducer = function(a, b) {
      return a + b;
    }

    $('form').on('submit', function(e) {
      var context = $(this).find('#page-name').val();
      var feesArr = [0];
      var vatArr = [0];
      var expenseArr = [0];
      var distbursementArr = [0];

      // add up all the fees
      $('.fx-calculate.fx-fees').each(function(idx, el) {
        var amount = parseFloat($(el).val() || 0);
        feesArr.push(amount);
        vatArr.push(amount * 0.2);
      });

      $('.fx-calculate.fx-expense').each(function(idx, el) {
        var amount = parseFloat($(el).val() || 0);
        expenseArr.push(amount);
        vatArr.push(amount * 0.2);
      });

      $('.fx-calculate.fx-disbursement').each(function(idx, el) {
        var amount = parseFloat($(el).val() || 0);
        distbursementArr.push(amount);
        vatArr.push(amount * 0.2);
      });

      $('.fx-calculate.fx-vat').each(function(idx, el) {
        // console.log('skipped', parseFloat($(el).val() || 0));
      });

      // console.log(vatArr.reduce(reducer));

      $('[name="' + context + '-fee"]').val(feesArr.reduce(reducer))
      $('[name="' + context + '-vat"]').val(vatArr.reduce(reducer))
      $('[name="' + context + '-expenses"]').val(expenseArr.reduce(reducer))
      $('[name="' + context + '-disbursements"]').val(distbursementArr.reduce(reducer))
      // e.preventDefault();
    });

  },
  setActionPath: function() {
    this.$el.is(function(idx, el) {
      if (!!~document.referrer.indexOf('cost-summary')) {
        $(el).attr('action', './cost-summary')
      }
    });
  }
}
