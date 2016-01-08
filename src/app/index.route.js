import m_region_route from "./main/m_region";
import m_system_route from "./main/m_system";
import access from "./main/access";



export default function routerConfig($stateProvider, $urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/');


    $stateProvider.state('app', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: function($scope) {

        }
    });


    angular.forEach(
        angular.extend(
            m_region_route,
            m_system_route,
            access

        ), (config, route) => {
            $stateProvider.state(route, config);
        }
    )





}
