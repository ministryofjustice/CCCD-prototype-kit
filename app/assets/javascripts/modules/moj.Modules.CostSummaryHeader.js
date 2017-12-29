moj.Modules.CostSummaryHeader = function(el) {
  this.el = el;
  this.$el = $(el)

  this.config = {
    fees: '.fx-total-fees',
    expenses: '.fx-total-expenses',
    vat: '.fx-total-vat',
    disbursements: '.fx-total-disbursements',
    total: '.fx-total-grand',
    currency: 'GBP'
  }

  this.totals = {
    fees: 0,
    expenses: 0,
    disbursements: 0,
    vat: 0
  }


  this.init = function() {
    // this.bindEvents();
    var self = this;
    this.totals.fees = parseFloat($.trim(this.$el.find(this.config.fees).text())||0);
    this.totals.expenses = parseFloat($.trim(this.$el.find(this.config.expenses).text())||0);
    this.totals.disbursements = parseFloat($.trim(this.$el.find(this.config.disbursements).text())||0);
    this.totals.vat = parseFloat($.trim(this.$el.find(this.config.vat).text())||0);


    this.totals.total = $.map(this.totals, function(val, key){
      return val;
    }).reduce(function(a,b){return a+b;});

    this.render();

  }

  this.format = function(str) {
    return moneyFormatter.format(this.config.currency, str||0)
  }

  this.render = function() {

    $(this.config.fees).text(this.format(this.totals.fees));
    $(this.config.expenses).text(this.format(this.totals.expenses));
    $(this.config.vat).text(this.format(this.totals.vat));
    $(this.config.disbursements).text(this.format(this.totals.disbursements));
    $(this.config.total).text(this.format(this.totals.total));
  }

  this.init()
  return this;
}
