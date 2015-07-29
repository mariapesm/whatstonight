'use strict';

angular.module('whatstonightApp')
  .controller('MainCtrl', function ($scope, $http, User, Auth) {
    $scope.awesomeThings = [];
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedInAsync = Auth.isLoggedInAsync;

    console.log($scope.getCurrentUser());
    $scope.searchBars = function(location) {

      if ($scope.getCurrentUser()._id !== undefined) {
        var user = $scope.getCurrentUser();
        user.location=location;
        $http.put('/api/users/' + user._id + '/location', user);
      }
      $scope.loading=true;

      $http.get('/api/bars/start/' + location).success(function(Bars) {
        $http.get('/api/bars/').success(function(oldBars) {
          $scope.bars=Bars.map(function(extBar) {
            for (var i =0; i < dbBars.length; i++) {
              if (extBar.url === dbBars[i].url) {
                return dbBars[i];
              }
            }
            return extBar;
          });
        })

        $scope.bars = Bars;
        $scope.loading=false;
      });

    }

    $scope.isLoggedInAsync(
      function(ready) {
        if (ready) {
          $scope.getCurrentUser().$promise.then(function(user){
            if (user.location!=="" && user.location !== undefined) {
                $scope.searchBars(user.location);
                $scope.location=user.location;
            }
          })
        }
      });


    $scope.going = function(bar) {

      /**
      $http.delete('/api/bars/' + bar._id);
      **/


      if ($scope.getCurrentUser()._id !== undefined) {
        if (bar.attending.indexOf($scope.getCurrentUser()._id)==-1) {
          bar.attending.push($scope.getCurrentUser()._id);
        } else {
          bar.attending[bar.attending.indexOf($scope.getCurrentUser()._id)]=null;
          bar.attending = bar.attending.filter(function(item){return item!==null});
        }
        if (bar._id !== undefined && bar._id !== null && bar._id !== "") {
          $http.put('/api/bars/' + bar._id, bar);
        } else { $http.post('/api/bars', bar).success(function(newBar){
            bar=newBar;
        });
        }
      } else {
        window.location.assign("http://localhost:9000/auth/twitter")
      }

      /**
      bar.attendees.push(getCurrentUser()._id);
      $http.post('/api/bars/',bar).success(function(Bars) {
        $scope.bars = Bars;
      })
      **/
    }

  });
