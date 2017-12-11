moj.Modules.ExpensesBlock = function(el) {
  this.el = el;
  this.$el = $(el)

  this.lookup = {
    distance: '.fx-distance',
    hours: '.fx-hours',
    location: '.fx-location',
    locationLabel: '.fx-locationLabel',
    mileage: '.fx-mileage',
    mileageType: '.fx-mileageType',
    reasonSet: '.fx-reasonSet',
    distanceLabel: '.fx-distanceLabel'
  }

  this.init = function() {
    this.bindEvents();
    this.setState();
  }

  this.setState = function(){
    if(this.$el.find('select.fx-expensetype option:selected').index()){
      this.$el.removeClass('hidden');
      this.$el.find('select.fx-expensetype').change();
    }
  }

  this.bindEvents = function() {
    var self = this;
    // Travel expenses fake reveal
    this.$el.on('change', 'select.fx-expensetype', function(e) {
      var config = $(e.target).find(':selected').data();
      self.hookMeUp(config)
    });
  }

  this.hookMeUp = function(config) {
    this.$el.find('.hidden').removeClass('hidden');
    this.$el.find(this.lookup['distance']).toggle(config.distance);
    this.$el.find(this.lookup['location']).toggle(config.location);
    this.$el.find(this.lookup['hours']).toggle(config.hours);
    this.$el.find(this.lookup['mileage']).toggle(config.mileage);
    this.$el.find(this.lookup['locationLabel']).text(config.locationLabel);
  }

  this.init()
  return this;
}
