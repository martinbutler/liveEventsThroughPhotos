'use strict';

angular.module('liveEventsThroughPhotosApp')
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization,places'
    });
  })
  .controller('LocationCtrl', function ($scope, uiGmapGoogleMapApi) {
    // Do stuff with your $scope.
    // Note: Some of the directives require at least something to be defined originally!
    // e.g. $scope.markers = []

    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function(maps) {

    });

    $scope.map = {center: {latitude: 40.758895, longitude: -73.98513100000002 }, zoom: 14 };
    $scope.options = {scrollwheel: false};
    var events = {
      places_changed: function (searchBox) {
        var places = searchBox.getPlaces();
        // console.log(places[0].geometry.location);
        $scope.map = {
          center: {
            latitude: places[0].geometry.location.k, 
            longitude: places[0].geometry.location.C
          }, 
          zoom: 14
        };
      }
    }
    $scope.searchbox = { template:'searchbox.tpl.html', events:events};

    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;

    $scope.marker = {
      id: 0,
      coords: {
        latitude: 40.758895,
        longitude: -73.98513100000002
      },
      options: { draggable: true },
      events: {
        dragend: function (marker, eventName, args) {
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          $scope.map = {
          center: {
            latitude: lat, 
            longitude: lon
          }, 
          zoom: 14
        };

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };


    $scope.$watchCollection("marker.coords", function (newVal, oldVal) {
      if (_.isEqual(newVal, oldVal))
        return;
      $scope.coordsUpdates++;
    });
  });
