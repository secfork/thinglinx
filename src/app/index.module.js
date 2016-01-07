



 import  config from './index.config';
 import routerConfig from './index.route';

 import runBlock from './index.run';

 import initServices from "./service";

 import initDirective from "./directive";



 // 'ngTouch', 'ngSanitize', 'ngAria', 

 var thinglinx = angular.module('thinglinx', [
     'ngAnimate', 'ngCookies', 'ngMessages',
     'ngResource', 'ui.router', 'ui.bootstrap', 'ngStorage',

     'ui.bootstrap.datetimepicker',
     'ui.load',
     'ui.jq',
     'ui.validate'

 ])

 .config(config)

 .config(routerConfig)


 .run(runBlock)

 .controller('AppCtrl', function($scope, $localStorage, $window, $modal, $state,
     $timeout, $sessionStorage, $q, $animate,
     $location, $rootScope) {
     'ngInject';


     function isSmartDevice($window) {
         // Adapted from http://www.detectmobilebrowsers.com
         var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
         // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
         return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
     }

     var isIE = !!navigator.userAgent.match(/MSIE/i);
     isIE && angular.element($window.document.body).addClass('ie');
     isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

     // config
     $scope.app = {
         name: 'Angulr',
         version: '1.3.0',
         // for chart colors
         color: {
             primary: '#7266ba',
             info: '#23b7e5',
             success: '#27c24c',
             warning: '#fad733',
             danger: '#f05050',
             light: '#e8eff0',
             dark: '#3a3f51',
             black: '#1c2b36'
         },
         settings: {

             themeID: 1,
             navbarHeaderColor: 'bg-black',
             navbarCollapseColor: 'bg-white-only',
             asideColor: 'bg-black',
             headerFixed: true,
             asideFixed: true,
             asideFolded: false
         }
     };

     // save settings to local storage
     if (angular.isDefined($localStorage.settings)) {
         $scope.app.settings = $localStorage.settings;
     } else {
         $localStorage.settings = $scope.app.settings;
     }
     $scope.$watch('app.settings', function() {
         $localStorage.settings = $scope.app.settings;
     }, true);

 });


 initServices(thinglinx);
 initDirective(thinglinx);
