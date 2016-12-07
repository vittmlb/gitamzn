/**
 * Created by Vittorio on 12/05/2016.
 */
angular.module('vendedoresml').factory('Vendedores', ['$resource', function ($resource) {
    return $resource('/api/vendedores_ml/:vendedorId', {
        vendedorId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);