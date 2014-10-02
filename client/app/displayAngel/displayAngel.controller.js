'use strict';

angular.module('cardifyTestApp')
  .controller('DisplayangelCtrl', function ($scope, $http) {
    this.getAngel = function(company) {
      // reset scope variables when searching for a new company
      $scope.userData = null;
      $scope.companyData = null;
      $scope.articleText = null;

      // no search input
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
    this.getNews = function(newsObj){
      $http.post('/api/angels/getNews', newsObj).success(function(data) {
        console.log('News Text: ', data);
        $scope.articleText = data;
      })
    }
  });
