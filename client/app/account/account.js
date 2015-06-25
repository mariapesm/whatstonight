'use strict';

angular.module('whatstonightApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/',
        controller: 'MainCtr;'
      })
      .when('/signup', {
        templateUrl: 'app/',
        controller: 'MainCtrl'
      })
      .when('/settings', {
        templateUrl: 'app/',
        controller: 'MainCtrl',
        authenticate: true
      });
  });
