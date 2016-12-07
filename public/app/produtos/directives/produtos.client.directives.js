/**
 * Created by Vittorio on 16/06/2016.
 */
angular.module('produtos').directive('containerProdutos', function () {
    return {
        restrict: 'AEC',
        transclude: true,
        templateUrl: 'app/produtos/views/partials/container-produto.client.partial.html'
    }
});