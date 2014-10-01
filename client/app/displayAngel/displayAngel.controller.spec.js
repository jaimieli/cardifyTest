'use strict';

describe('Controller: DisplayangelCtrl', function () {

  // load the controller's module
  beforeEach(module('cardifyTestApp'));

  var DisplayangelCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DisplayangelCtrl = $controller('DisplayangelCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
