moj.Modules.ExpensesBlock = function(el) {
  this.el = el;
  this.$el = $(el)
  this.postcode = 'N1 8LN';
  this.lookup = {
    distance: '.fx-distance',
    hours: '.fx-hours',
    location: '.fx-location',
    locationLabel: '.fx-locationLabel',
    mileage: '.fx-mileage',
    mileageType: '.fx-mileageType',
    reasonSet: '.fx-reasonSet',
    distanceLabel: '.fx-distanceLabel',
    mileage40: '.fx-40p',
    mileage20: '.fx-20p',
    expense: '.fx-expense',
    vat: '.fx-vat',
  }

  this.init = function() {
    this.bindEvents();
    this.setState();
    this.directions();
  }

  this.directions = function() {
    this.directionsService = new moj.Helpers.GMaps.Directions;
    this.directionsDisplay = new moj.Helpers.GMaps.DirectionsRender;
  }

  this.calculateDistance = function(destTo, destFrom) {
    var self = this;
    this.directionsService.route({
      origin: destFrom || 'Woking, UK',
      destination: destTo || 'Southampton, UK',
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        var distance = parseFloat(response.routes[0].legs[0].distance.text.split(' ')[0]*1.6).toFixed(0);
        var multiplier = self.$el.find('.fx-mileage input:checked').val()*0.01;
        var expense = parseFloat(distance * multiplier).toFixed(2);
        var vat = parseFloat(expense * 0.2).toFixed(2);
        self.$el.find(self.lookup.distance + ' input').val(distance);
        self.$el.find(self.lookup.expense).val(expense)
        self.$el.find(self.lookup.vat).val(vat)
        // directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    })
  }

  this.setState = function() {
    if (this.$el.find('select.fx-expensetype option:selected').index()) {
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

    this.$el.on('typeahead:select', function(e, val){
      self.calculateDistance(val)
    });

    this.$el.on('change','.fx-mileage', function(){
      self.calculateDistance(self.$el.find('.tt-input').val());
    })

  }

  this.hookMeUp = function(config) {

    if (config.mileageType == 'bike') {
      this.$el.find(this.lookup['mileage40']).toggle(false);
      this.$el.find(this.lookup['mileage20'] + ' input').prop('checked', true);
      this.$el.find(this.lookup['mileage20'] + ' label').text('20p per mile');


    } else {
      this.$el.find(this.lookup['mileage40']).toggle(true);
      this.$el.find(this.lookup['mileage40'] + ' input').prop('checked', true);
      this.$el.find(this.lookup['mileage20'] + ' label').text('25p per mile');

    }

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
