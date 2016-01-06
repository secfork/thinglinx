'use strict';

describe('Controller: MSystemCtrl', function () {

  // load the controller's module
  beforeEach(module('thinglinxApp'));

  var MSystemCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MSystemCtrl = $controller('MSystemCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
