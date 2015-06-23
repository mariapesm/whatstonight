'use strict';

angular.module('whatstonightApp')
  .controller('MainCtrl', function ($scope, $http, User, Auth) {
    $scope.awesomeThings = [];


    $scope.searchBars = function() {
      $http.get('/api/bars/start/' + $scope.location).success(function(Bars) {
        $scope.bars = Bars;
      })
    }

    $scope.going = function(bar) {
      bar.attendees.push(getCurrentUser()._id);
      $http.post('/api/bars/',bar).success(function(Bars) {
        $scope.bars = Bars;
      })
    }

  });
