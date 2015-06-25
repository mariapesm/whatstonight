'use strict';

angular.module('whatstonightApp')
  .controller('MainCtrl', function ($scope, $http, User, Auth) {
    $scope.awesomeThings = [];
    $scope.getCurrentUser = Auth.getCurrentUser;

    console.log($scope.getCurrentUser());
    $scope.searchBars = function() {

      if ($scope.getCurrentUser()._id !== undefined) {
        var user = $scope.getCurrentUser();
        user.location=$scope.location;
        $http.put('/api/users/' + user._id + '/location', user);
      }
      $scope.loading=true;

      $http.get('/api/bars/start/' + $scope.location).success(function(Bars) {
        $http.get('/api/bars/').success(function(dbBars) {
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
    $scope.init=function(){
      if ($scope.getCurrentUser().location!=="" && $scope.getCurrentUser().location !== undefined) {
        $scope.location = $scope.getCurrentUser().location;
        $scope.searchBars();
      }
    }
    
    $scope.going = function(bar) {
      if ($scope.getCurrentUser()._id !== undefined) {
        if (bar.attending.indexOf($scope.getCurrentUser()._id)==-1) {
          bar.attending.push($scope.getCurrentUser()._id);
        } else {
          bar.attending[bar.attending.indexOf($scope.getCurrentUser()._id)]=null;
          bar.attending = bar.attending.filter(function(item){return item!==null});
        }
        if (bar._id !== undefined && bar._id !== null && bar._id !== "") {
          $http.delete('/api/bars/' + bar._id).success(function(){
            $http.post('/api/bars/', bar).success(function(bar) {

            })
          })
        } else { $http.post('/api/bars', bar).success(function(bar){
            //scope.bars=[];
            //searchBars();
        })
        }
      } else {
        window.location.assign("http://whatsgoinontonight.herokuapp.com/auth/twitter")

      }


      /**
      bar.attendees.push(getCurrentUser()._id);
      $http.post('/api/bars/',bar).success(function(Bars) {
        $scope.bars = Bars;
      })
      **/
    }

  });
