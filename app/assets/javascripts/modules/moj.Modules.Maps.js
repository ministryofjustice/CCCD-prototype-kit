moj.Modules.Maps = {
  init: function() {
    // this.initMap();
  },
  initMap: function() {
    var directionsService = new moj.Helpers.GMaps.Directions;
    var directionsDisplay = new moj.Helpers.GMaps.DirectionsRender;

    this.calculateAndDisplayRoute(directionsService, directionsDisplay);
    // var map = new moj.Helpers.GMaps.Map('map', {
    //   zoom: 7,
    //   center: {
    //     lat: 41.85,
    //     lng: -87.65
    //   }
    // });
    // // directionsDisplay.setMap(map);
    // console.log(map);
    // var onChangeHandler = function() {
    //   calculateAndDisplayRoute(directionsService, directionsDisplay);
    // };

    // document.getElementById('start').addEventListener('change', onChangeHandler);
    // document.getElementById('end').addEventListener('change', onChangeHandler);

  },
  calculateAndDisplayRoute: function(directionsService, directionsDisplay) {
    directionsService.route({
      origin: 'Woking, UK',
      destination: 'Southampton, UK',
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        console.log('>>>', response.routes[0].legs[0].distance.text);
        // directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    })
  }
};
