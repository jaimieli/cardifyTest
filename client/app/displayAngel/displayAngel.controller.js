'use strict';

angular.module('cardifyTestApp')
  .controller('DisplayangelCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
    this.getAngel = function(company) {
      console.log('clicked');
      console.log('company: ', company);
      $http.get('/api/angels/getAngel/' + company).success(function(data){
        console.log(data);
        $scope.companyData = data;
      })
    }
  });
