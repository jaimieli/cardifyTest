'use strict';

angular.module('cardifyTestApp')
  .controller('MainCtrl', function ($scope, $http, socket, $location) {

    $scope.message = 'Hello';
    this.getAngel = function(company) {
      if(company === undefined) {
        return;
      }
      $location.path('/displayAngel/' + company);
    }
    this.getEmployee = function(user) {
      console.log('id: ', user)
      $http.get('/api/angels/getUser/' + user).success(function(data){
        console.log('User Data: ', data);
        $scope.userData = data;
      })
    }
  });
