'use strict';

angular.module('thinglinxApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('m_system', {
        url: '/m_system',
        templateUrl: 'app/m_system/m_system.html',
        controller: 'MSystemCtrl'
      });
  });
