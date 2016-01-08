export default function runBlock($rootScope, $state, $stateParams, $sys, $compile,
    $localStorage, $cacheFactory, $log, $sce, $sessionStorage) {

    'ngInject';
    $log.debug('runBlock end');

    $('#preload').fadeOut('slow');

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$sys = $sys; 
    $rootScope.$sceHtml = $sce.trustAsHtml;
    $rootScope.$session = $sessionStorage;
    $rootScope.fromJson = angular.fromJson;



    //@if  append

    window.test = function() {
        alert("test  function !")
    };

    $rootScope.test = function() {
            alert("test  function !")
        }
    //@endif



}
