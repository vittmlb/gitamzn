/**
 * Created by Vittorio on 12/05/2016.
 */
angular.module('vendedoresml').controller('VendedoresController', ['$scope', '$routeParams', '$location', 'Vendedores',
    function($scope, $routeParams, $location, Vendedores) {
        $scope.create = function() {
            var vendedor = new Vendedores({
                vendedorId: this.vendedorId
            });
            vendedor.$save(function (response) {
                $location.path('/vendedores/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.find = function() {
            $scope.vendedores = Vendedores.query();
        };
        $scope.findOne = function() {
            $scope.vendedor = Vendedores.get({
                vendedorId: $routeParams.vendedorId
            });
        };
    }
]);