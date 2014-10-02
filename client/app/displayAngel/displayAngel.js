'use strict';

angular.module('cardifyTestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('displayAngel', {
        url: '/displayAngel/:company',
        templateUrl: 'app/displayAngel/displayAngel.html',
        controller: 'DisplayangelCtrl',
        controllerAs: 'Angel'
      });
  });