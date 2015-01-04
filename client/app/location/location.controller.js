'use strict';

angular.module('liveEventsThroughPhotosApp')
  .config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization,places'
    });
  })
  .controller('LocationCtrl', function ($scope, uiGmapGoogleMapApi, $window) {
    // uiGmapGoogleMapApi is a promise.
    // The "then" callback function provides the google.maps object.
    uiGmapGoogleMapApi.then(function(maps) {

    });
    // inti to times square
    $scope.map = {center: {latitude: 40.758895, longitude: -73.98513100000002 }, zoom: 14 };
    $scope.map.visualRefresh = true;
    $scope.markers = [{
      id: 0,
      coords: {
        latitude: 40.758895,
        longitude: -73.98513100000002
      },
      place_id: "ChIJmQJIxlVYwokRLgeuocVOGVU",
      name: "Times Square",
      options: { 
        draggable: true,
        icon: 'assets/images/blue_marker.png' 
      },
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
        }
      }
    }];

    var events = {
      places_changed: function (searchBox) {
        var places = searchBox.getPlaces();     
        $scope.markers = [];
        for (var i = 0, place; place = places[i]; i++) {
          // Create a marker for each place.
          var marker = {
            id: i,
            coords: {
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng()
            },
            options: { 
              draggable: true
            },
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
              }
            },
            place_id: place.place_id,
            name: place.name,
          };
          $scope.markers.push(marker);
        }
        $scope.markers[0].options.icon = 'assets/images/blue_marker.png'
        $scope.photosByLocation = $scope.markers[0];

        $scope.map = {
          center: {
            latitude: places[0].geometry.location.k, 
            longitude: places[0].geometry.location.C
          }, 
          zoom: 14
        }; 

        _.each($scope.markers, function(marker) {
          marker.closeClick = function() {
            $scope.selected.options.visible = true;
            marker.options.visble = true;
            return $scope.$apply();
          };
          marker.onClicked = function() {
            $scope.selected.options.visible = true;
            $scope.selected = marker;
            $scope.selected.options.visible = true;
          };
        });
      }
    }
    $scope.searchbox = { template:'searchbox.tpl.html', events:events};

    $scope.coordsUpdates = 0;
    $scope.dynamicMoveCtr = 0;

    $scope.photosByLocation = $scope.markers[0];

    $scope.markerClick = function(id) {
      if (id == $scope.photosByLocation.id) {return};
      $scope.markers[$scope.photosByLocation.id].options.icon = '';
      $scope.markers[id].options.icon = 'assets/images/blue_marker.png';
      $scope.photosByLocation = $scope.markers[id];
    };

    $scope.showPhotos = function(marker) {
      $window.location.href = '/photos/' + $scope.photosByLocation.coords.latitude + '/' + $scope.photosByLocation.coords.longitude;
    }

  });
