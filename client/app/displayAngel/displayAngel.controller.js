'use strict';

angular.module('cardifyTestApp')
  .controller('DisplayangelCtrl', function ($scope, $http, $stateParams) {
    $scope.showCompany = true;
    $scope.showTeam = false;
    $scope.showNews = false;
    $scope.showJobs = false;
    this.show = function (section) {
      if (section === 'company') {
        $scope.showCompany = true;
        $scope.showTeam = false;
        $scope.showNews = false;
        $scope.showJobs = false;
      }
      if (section === 'team') {
        $scope.showTeam = true;
        $scope.showCompany = false;
        $scope.showNews = false;
        $scope.showJobs = false;
      }
      if (section === 'news') {
        $scope.showNews = true;
        $scope.showTeam = false;
        $scope.showCompany = false;
        $scope.showJobs = false;
      }
      if (section === 'jobs') {
        $scope.showJobs = true;
        $scope.showTeam = false;
        $scope.showCompany = false;
        $scope.showNews = false;
      }
    }




    // format number to have commas
    var numberWithCommas = function(x){
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    this.sideBar = function() {
      $scope.boolChangeClass = !$scope.boolChangeClass;
    }

    $http.get('/api/angels/getAngel/' + $stateParams.company).success(function(data){
        console.log('Company Data: ', data);
        $scope.companyData = data;
        $scope.companyData.jobs.forEach(function(el){
          el.salary_max_display = '$' + numberWithCommas(el.salary_max);
          el.salary_min_display = '$' + numberWithCommas(el.salary_min);
        });
        // format funding to have commas + $
        $scope.companyData.crunchbase.properties.total_funding_usd_display = '$' + numberWithCommas($scope.companyData.crunchbase.properties.total_funding_usd);
        // format date
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        $scope.companyData.crunchbase.properties.founded_on_display = months[$scope.companyData.crunchbase.properties.founded_on_month - 1] + ' ' + $scope.companyData.crunchbase.properties.founded_on_day + ', ' + $scope.companyData.crunchbase.properties.founded_on_year;
      });
    $scope.message = 'Hello';
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
        // format salary to have commas + $
        $scope.companyData.jobs.forEach(function(el){
          el.salary_max_display = '$' + numberWithCommas(el.salary_max);
          el.salary_min_display = '$' + numberWithCommas(el.salary_min);
        });
        // format funding to have commas + $
        $scope.companyData.crunchbase.properties.total_funding_usd_display = '$' + numberWithCommas($scope.companyData.crunchbase.properties.total_funding_usd);
        // format date
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        $scope.companyData.crunchbase.properties.founded_on_display = months[$scope.companyData.crunchbase.properties.founded_on_month - 1] + ' ' + $scope.companyData.crunchbase.properties.founded_on_day + ', ' + $scope.companyData.crunchbase.properties.founded_on_year;
      });
    };
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
