/**
 * Created by Vittorio on 17/05/2016.
 */
angular.module('produtos').factory('Produtos', ['$resource', function ($resource) {
    return $resource('/api/produtos_amazon/:produtoId', {
        produtoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);