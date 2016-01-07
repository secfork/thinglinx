  import  m_region_ctrl from "./main/m_region/m_region.controller";



export default function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';
 
    $urlRouterProvider.otherwise('/');


    $stateProvider.state('app', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: function($scope) {

        }
    });


    $stateProvider.state("app.m_region" , {
    	url:"m_region",
    	templateUrl:"app/main/m_region/m_region.html",
        controller: m_region_ctrl, 
    })




}
