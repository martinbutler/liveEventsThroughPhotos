'use strict';

angular.module('liveEventsThroughPhotosApp')
  .controller('PhotosCtrl', function ($scope, $http, socket, $timeout) {
    
    $scope.photoData = [];
    $scope.tag='nyc';
    $scope.imageOne = 0;
    $scope.imageTwo = 1;
    $scope.imageThree = 2;
    $scope.imageFour = 19;

    $scope.onTimeout = function(){
        if ($scope.imageFour == 19) {
          $http.get('/api/instagrams/tag/'+$scope.tag).success(function(photoData) {
            $scope.photoData = photoData;
          });
          $scope.imageOne = 0;
          $scope.imageTwo = 1;
          $scope.imageThree = 2;
          $scope.imageFour = 3;
        } else {
          $scope.imageOne += 4;
          $scope.imageTwo += 4;
          $scope.imageThree += 4;
          $scope.imageFour += 4;
        }
        mytimeout = $timeout($scope.onTimeout,4000);
    }
    var mytimeout = $timeout($scope.onTimeout,1);

    $scope.updateTag = function () {
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
