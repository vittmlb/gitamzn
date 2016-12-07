/**
 * Created by Vittorio on 28/09/2016.
 */
angular.module('vistas').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('vistas_create', {
                url: '/vistas/create',
                templateUrl: 'app/vistas/views/create-vista.client.view.html',
                controller: 'VistasController'
            })
            .state('vistas_list', {
                url: '/vistas',
                templateUrl: 'app/vistas/views/list-vistas.client.view.html',
                controller: 'VistasController'
            })
            .state('vistas_view', {
                url: '/vistas/:vistaId',
                templateUrl: 'app/vistas/views/view-vista.client.view.html',
                controller: 'VistasController'
            })
            .state('vistas_edit', {
                url: '/vistas/:vistaId/edit',
                templateUrl: 'app/vistas/views/edit-vista.client.view.html',
                controller: 'VistasController'
            });
    }
]);