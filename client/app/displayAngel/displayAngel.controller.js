'use strict';

angular.module('cardifyTestApp')
  .controller('DisplayangelCtrl', function ($scope, $http, $stateParams) {

    this.sideBar = function() {
      $scope.boolChangeClass = !$scope.boolChangeClass;
    }

    $http.get('/api/angels/getAngel/' + $stateParams.company).success(function(data){
        console.log('Company Data: ', data);
        $scope.companyData = data;
      });
    $scope.message = 'Hello';
    this.getAngel = function(company) {
      if(company === undefined) {
        return;
      }
      $http.get('/api/angels/getAngel/' + company).success(function(data){
        console.log('Company Data: ', data);
        $scope.companyData = data;
      })
    }
    this.getEmployee = function(user) {
      console.log('id: ', user)
      $http.get('/api/angels/getUser/' + user).success(function(data){
        console.log('User Data: ', data);
        $scope.userData = data;
      })
    }



  });
