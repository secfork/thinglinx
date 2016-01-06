'use strict';


angular.module('thinglinxApp', [

        'ngCookies',

        'ngResource',

        'ngSanitize',

        'ui.router',
        'ngStorage',

        'ui.bootstrap'

    ])

    
    .config(($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider,
        $filterProvider, $provide, $httpProvider, $resourceProvider , $locationProvider ) => {

        $urlRouterProvider.otherwise('/');

        // 加上 就不好使了; 
        // $locationProvider.html5Mode(true);

    })

  .run(($rootScope, $state, $sys, $stateParams, $compile, $localStorage, $cacheFactory, $sce, $sessionStorage) => {

    $('#preload').fadeOut('slow');



    $rootScope.$sys = $sys;
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$sceHtml = $sce.trustAsHtml;
    $rootScope.$session = $sessionStorage;
    $rootScope.fromJson = angular.fromJson;


    $rootScope.ossRoot = "@@oss";

    //@if  append
    window.testFun = function() {
        alert("test  function !")
    };

    $rootScope.testFun = function() {
        alert("test  function !")
    };
    //@endif



})

.controller("AppCtrl", ($scope, $localStorage, $window, $modal, $state, $sys) => {

    console.log($sys)

    $scope.aa = 1;

    //@if  append

    console.log("app ctrl", $scope);
    //@endif

    //"f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650";

    // add 'ie' classes to html
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
})




;
