'use strict';

angular.module('whatstonightApp')
  .controller('MainCtrl', function ($scope, $http, User, Auth) {
    $scope.awesomeThings = [];


    $scope.searchBars = function() {
      $scope.loading=true;
      $http.get('/api/bars/start/' + $scope.location).success(function(Bars) {
        $scope.bars = Bars;
        $scope.loading=false;
      })
    }

    $scope.going = function(bar) {

      bar.attendees.push(getCurrentUser()._id);
      $http.post('/api/bars/',bar).success(function(Bars) {
        $scope.bars = Bars;
      })
    }

  });
