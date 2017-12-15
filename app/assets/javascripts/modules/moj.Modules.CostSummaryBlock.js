// Constructor
moj.Modules.CostSummaryBlock = function(el) {
  this.el = el;
  this.$el = $(el)

  this.itemNetAmounts = [];
  this.itemVatAmounts = [];
  this.blockTotal = null;


  // config settings
  this.config = {
    // the root element of a block
    catBlock: '.fx-category-block',

    // the item level net amount
    itemNetAmount: '.fx-item-net-amount',

    itemVatAmount: '.fx-item-vat-amount',

    // the catergoty level total
    catBlockNetTotal: '.fx-category-block-net-total',

    currency: 'USD'
  }

  // calculator
  this.add = function(a, b) {
    return Number(a) + Number(b);
  }


  /**
   * Calculations and formatting is done in two steps
   */
  this.init = function() {
    this.calcCatBlockNetTotal();

    this.formatNumbers();
  }

  this.calcCatBlockNetTotal = function() {
    var self = this;

    // Find all the net amounts and cache
    // the values in an array
    this.$el.find(this.config.itemNetAmount).each(function(idx, item) {
      var amount = $(item).text();
      self.itemNetAmounts.push(amount);
    })

    // Find all the vat amounts and cache
    // the values in an array
    this.$el.find(this.config.itemVatAmount).each(function(idx, item) {
      var amount = $(item).text();
      self.itemVatAmounts.push(amount);
    })

    this.blockVatTotal =  this.itemVatAmounts.reduce(this.add, 0);

    // reduce the values to a total and cache it
    this.blockTotal = this.itemNetAmounts.reduce(this.add, 0);


    // update the view
    this.$el.find(this.config.catBlockNetTotal).text(this.blockTotal + this.blockVatTotal);

    $.publish('update.blockTotal', {
      value: this.blockTotal,
      type: this.$el.data('type')
    });
  }

  // TODO: better!
  this.formatNumbers = function() {
    var self = this;
    // Find all the net amounts
    // - apply the formatting
    // - update the view
    this.$el.find(this.config.itemNetAmount).is(function(idx, el) {
      $(el).text(moneyFormatter.format(self.config.currency, $(el).text()))
    })

    this.$el.find(this.config.itemVatAmount).is(function(idx, el) {
      $(el).text(moneyFormatter.format(self.config.currency, $(el).text()))
    })

    // Find all the block net total
    // - apply the formatting
    // - update the view
    this.$el.find(this.config.catBlockNetTotal).is(function(idx, el) {
      $(el).text(moneyFormatter.format(self.config.currency, $(el).text()))
    })
  }

  this.init()
  return this;
}
