'use strict';

angular.module('cardifyTestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('displayAngel', {
        url: '/displayAngel',
        templateUrl: 'app/displayAngel/displayAngel.html',
        controller: 'DisplayangelCtrl',
        controllerAs: 'Angel'
      });
  });