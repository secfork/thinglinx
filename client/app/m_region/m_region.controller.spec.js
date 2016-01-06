'use strict';

describe('Controller: MRegionCtrl', function () {

  // load the controller's module
  beforeEach(module('thinglinxApp'));

  var MRegionCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MRegionCtrl = $controller('MRegionCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
