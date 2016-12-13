/**
 * Created by Vittorio on 28/09/2016.
 */
angular.module('vistas').factory('Vistas', ['$resource', function ($resource) {
    return $resource('/api/vistas_amazon/:vistaId', {
        vistaId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    })
}]);