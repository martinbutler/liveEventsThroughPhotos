'use strict';

angular.module('liveEventsThroughPhotosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('photos', {
        url: '/photos',
        templateUrl: 'app/photos/photos.html',
        controller: 'PhotosCtrl'
      })
      .state('coords', {
        url: '/photos/:lat/:long',
        templateUrl: 'app/photos/photos.html',
        controller: 'PhotosCtrl'
      });
  });