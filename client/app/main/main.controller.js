'use strict';

angular.module('liveEventsThroughPhotosApp')
  .controller('MainCtrl', function ($scope, $http, socket, $timeout) {
    $scope.awesomeThings = ['g4.jpg', 'g5.jpg', 'g6.jpg', 'g7.jpg'];
    $scope.awesomeThing = $scope.awesomeThings[0];
    $scope.photoIndex = 0;


    $scope.onTimeout = function(){
      if ($scope.awesomeThings.length == $scope.photoIndex + 1) {
        $scope.photoIndex = 0;
      } else 
      {
        $scope.photoIndex++;
      }
      $scope.awesomeThing = $scope.awesomeThings[$scope.photoIndex];
      mytimeout = $timeout($scope.onTimeout,4000);
    }
    var mytimeout = $timeout($scope.onTimeout,1);

  });
