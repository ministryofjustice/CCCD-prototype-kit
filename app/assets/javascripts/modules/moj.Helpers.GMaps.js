moj.Helpers.GMaps = {
  Directions: function() {
    return new google.maps.DirectionsService;
  },
  DirectionsRender: function() {
    return new google.maps.DirectionsRenderer;
  },
  Map: function(el, options) {
    el = el || 'map'
    var defaults = {
      zoom: 7,
      center: {
        lat: 41.85,
        lng: -87.65
      }
    };
    options = $.extend({}, defaults, options)
    return new google.maps.Map(document.getElementById(el), options);
  }
}
