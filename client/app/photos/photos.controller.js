'use strict';

angular.module('liveEventsThroughPhotosApp')
  .controller('PhotosCtrl', function ($scope, $http, socket, $timeout, $stateParams, $window) {
    
    $scope.photoData = [];
    $scope.imageOne = 0;
    $scope.imageTwo = 1;
    $scope.imageThree = 2;
    $scope.imageFour = 19;
    $scope.showPhotoNumber = 4;

    var photoByLoc = false;
    if ($stateParams.lat !== undefined && $stateParams.long !== undefined) {
      photoByLoc = true;
      $scope.geoTag = true;
    } else {
      $scope.tag = 'nyc';
    }

    $scope.onTimeout = function(){
        if ($scope.photoData.length <= $scope.imageFour + $scope.showPhotoNumber) {
          if (photoByLoc) {
            console.log('ding');
            $http.post('/api/instagrams/location', {lat: $stateParams.lat, lng: $stateParams.long}).success(function(photoData) {
              $scope.photoData = photoData;
            });
          } else {
            $http.post('/api/instagrams/tag', {tag: $scope.tag}).success(function(photoData) {
              $scope.photoData = photoData;
            });
          }
          $scope.imageOne = 0;
          $scope.imageTwo = 1;
          $scope.imageThree = 2;
          $scope.imageFour = $scope.showPhotoNumber - 1;
        } else {
          $scope.imageOne += $scope.showPhotoNumber;
          $scope.imageTwo += $scope.showPhotoNumber;
          $scope.imageThree += $scope.showPhotoNumber;
          $scope.imageFour += $scope.showPhotoNumber;
        }
        mytimeout = $timeout($scope.onTimeout,4000);
    }
    var mytimeout = $timeout($scope.onTimeout,1);

    $scope.updateTag = function () {
      $scope.geoTag = photoByLoc = false;
      console.log('updatetag', $scope.newTag);
      if ($scope.newTag === undefined) {return};
      $scope.tag = $scope.newTag;
      $scope.imageFour = 19;
      $scope.newTag = "";
    }

    $scope.keypress = function($event) {
      if($event.keyCode == 13) {
        $scope.updateTag();
      }
    };

    $scope.updateGeoTag = function () {
      $window.location.href = '/location';
    }

    // $scope.addinstagram = function() {
    //   if($scope.newinstagram === '') {
    //     return;
    //   }
    //   $http.post('/api/instagrams', { name: $scope.newinstagram });
    //   $scope.newinstagram = '';
    // };

    // $scope.deleteinstagram = function(instagram) {
    //   $http.delete('/api/instagrams/' + instagram._id);
    // };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('instagram');
    });

  });
