'use strict';

angular.module('thinglinxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('app.m_region', {
        url: 'm_region',
        templateUrl: 'app/m_region/m_region.html',
        controller: 'MRegionCtrl'
      });
  });
