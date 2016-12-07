/**
 * Created by Vittorio on 12/05/2016.
 */

angular.module('vendedoresml').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('vendedores_create', {
                url: '/vendedores',
                templateUrl: 'app/vendedores_ml/views/create-vendedor.client.view.html',
                controller: 'VendedoresController'
            })
            .state('vendedores_list', {
                url: '/vendedores',
                templateUrl: 'app/vendedores_ml/views/list-vendedores.client.view.html',
                controller: 'VendedoresController'
            })
            .state('vendedores_view', {
                url: '/vendedores/:vendedorId',
                templateUrl: 'app/vendedores_ml/views/view-vendedor.client.view.html',
                controller: 'VendedoresController'
            })
    }
]);
