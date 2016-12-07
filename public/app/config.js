/**
 * Created by Vittorio on 01/08/2016.
 */
angular.module('impml').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/produtos');
    }
]);