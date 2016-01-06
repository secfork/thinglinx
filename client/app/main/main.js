 
/*

angular.module('thinglinxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m_region', {
        url: '/m_region',
        templateUrl: 'app/m_region/m_region.html',
        controller: 'MRegionCtrl'
      });
  });
*/


angular.module('thinglinxApp')

  .config(function ($stateProvider) {
    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
