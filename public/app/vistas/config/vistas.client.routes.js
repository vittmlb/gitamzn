/**
 * Created by Vittorio on 28/09/2016.
 */
angular.module('vistas').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('vistas_create', {
                url: '/vistas_amazon/create',
                templateUrl: 'app/vistas/views/create-vista.client.view.html',
                controller: 'VistasController'
            })
            .state('vistas_list', {
                url: '/vistas_amazon',
                templateUrl: 'app/vistas/views/new-list-vistas.client.view.html',
                controller: 'VistasController'
            })
            .state('vistas_view', {
                url: '/vistas_amazon/:vistaId',
                templateUrl: 'app/vistas/views/view-vista.client.view.html',
                controller: 'VistasController'
            })
            .state('vistas_edit', {
                url: '/vistas_amazon/:vistaId/edit',
                templateUrl: 'app/vistas/views/edit-vista.client.view.html',
                controller: 'VistasController'
            });
    }
]);