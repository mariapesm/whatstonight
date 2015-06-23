'use strict';

angular.module('whatstonightApp')
  .controller('MainCtrl', function ($scope, $http, User, Auth) {
    $scope.awesomeThings = [];

    $scope.location = "77006";

    $scope.searchBars = function() {  
      $http.get('/api/bars/start/' + $scope.location).success(function(Bars) {
        $scope.bars = Bars;
      })
    }



  });
