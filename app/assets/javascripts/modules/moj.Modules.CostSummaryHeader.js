moj.Modules.CostSummaryHeader = function(el) {
  this.el = el;
  this.$el = $(el)

  this.config = {
    fees: '.fx-total-fees',
    expenses: '.fx-total-expenses',
    vat: '.fx-total-vat',
    disbursements: '.fx-total-disbursemens',
    total: '.fx-total-grand',
    currency: 'USD'
  }

  this.totals = {
    fees: 0,
    expenses: 0,
    disbursements: 0,
    vat: 0,
    total: 0
  }


  this.init = function() {
    this.bindEvents();
  }

  this.bindEvents = function() {
    var self = this;
    $.subscribe('update.blockTotal', function(e, obj) {
      self.totals[obj.type] = self.totals[obj.type] + obj.value;
      self.totals.total = self.totals.total + obj.value
      self.render();
    });
  }

  this.format = function(str) {
    return moneyFormatter.format(this.config.currency, str||0)
  }

  this.render = function() {

    $(this.config.fees).text(this.format(this.totals.fees))
    $(this.config.expenses).text(this.format(this.totals.expenses))
    $(this.config.vat).text(this.format(this.totals.vat))
    $(this.config.disbursements).text(this.format(this.totals.disbursements))
    $(this.config.total).text(this.format(this.totals.total))
  }

  this.init()
  return this;
}
