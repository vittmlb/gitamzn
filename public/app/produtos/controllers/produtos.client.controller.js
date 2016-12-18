/**
 * Created by Vittorio on 17/05/2016.
 */
angular.module('produtos').controller('ListProdutosController', ['$scope', '$stateParams', '$location', 'Produtos', 'ngToast',
    function($scope, $stateParams, $location, Produtos, ngToast) {

        $scope.sortkey = 'media.venda';
        $scope.reverse = true;
        $scope.reverseSort = function() {
            $scope.reverse = !$scope.reverse;
        };
        $scope.sort = function(keyname) {
            $scope.sortkey = keyname;
        };

        let data1 = [
            [0,4],[1,8],[2,5],[3,10],[4,4],[5,16],[6,5],[7,11],[8,6],[9,11],[10,20],[11,10],[12,13],[13,4],[14,7],[15,8],[16,12]
        ];
        let data2 = [
            [0,0],[1,2],[2,7],[3,4],[4,11],[5,4],[6,2],[7,5],[8,11],[9,5],[10,4],[11,1],[12,5],[13,2],[14,5],[15,2],[16,0]
        ];

        /**
         * Definition of variables
         * Flot chart
         */
        var options = {
            series: {
                lines: {
                    show: false,
                    fill: true
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.4
                },
                points: {
                    radius: 0,
                    show: true
                },
                shadowSize: 2
            },
            grid: {
                hoverable: true,
                clickable: true,

                borderWidth: 2,
                color: 'transparent'
            },
            colors: ["#1ab394", "#1C84C6"],
            xaxis:{
                mode: 'time',
                timeformat: '%d/%m'
            },
            yaxis: {
            },
            tooltip: false
        };
        this.flotO = options;

        $scope.xUpdateAll = function() {
            $scope.produtos.forEach(function (prod) {
                prod.$update(function () {
                    ngToast.create('Produto atualizado com sucesso !!!');
                }, function(errorResponse) {
                    ngToast.danger(errorResponse.data.message);
                    $scope.error = errorResponse.data.message;
                });
            });
        };

        $scope.loadData = function() {
            var d = $scope.formaDados();
            $scope.flotD = [d];
        };

        $scope.formaDados = function(produto) {
            let info = [];
            for (let i = 0; i < produto.historico.length; i++) {
                // var reviews = produto.historico[i].reviews - produto.historico[i - 1].reviews;
                let reviews = produto.historico[i].reviews_da_data;
                let data = new Date(produto.historico[i].data);
                info.push([data.getTime(), reviews]);
            }
            return info;
        };
        
        $scope.create = function() {
            var produto = new Produtos({
                produtoUrl: this.produtoUrl
            });
            produto.$save(function (response) {
                $location.path('/produtos/' + response._id);
            }, function(errorResponse) {
                ngToast.danger(errorResponse.data.message);
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.delete = function(produto) {
            var result = confirm('Você deseja realmente remover este produto?');
            if(result) {
                if(produto) {
                    produto.$remove(function () {
                        for (var i in $scope.produtos) {
                            if($scope.produtos[i] === produto) {
                                $scope.produtos.splice(i, 1);
                            }
                        }
                    });
                } else {
                    $scope.produto.$remove(function () {
                        $location.path('/produtos');
                    });
                }
            }
        };
        $scope.find = function() {
            $scope.produtos = Produtos.query();
            $scope.filteredProdutos = $scope.produtos;
        };
        $scope.findOne = function() {
            // $scope.produto = Produtos.get({
            //     produtoId: $stateParams.produtoId
            // });
            Produtos.get({
                produtoId: $stateParams.produtoId
            }).$promise.then(function(data) {
                let d = $scope.formaDados(data);
                // $scope.flotD = [data1];
                $scope.flotD = [d];
                $scope.produto = data;
            });
        };
        $scope.update = function() {
            $scope.produto.$update(function (response) {
                $location.path('/produtos/' + response._id);
            });
        };
        $scope.atualizarVenda = function(item) {
            item.$update(function () {
                $location.path('/produtos');
            }, function(errorResponse) {
                ngToast.danger(errorResponse.data.message);
                $scope.error = errorResponse.data.message;
            });
        };
        $scope.atualizarTodasVendas = function() {
            $scope.produtos.forEach(function(prod) {
                prod.$update(function () {
                    ngToast.create('Produto atualizado com sucesso !!!');
                }, function(errorResponse) {
                    ngToast.danger(errorResponse.data.message);
                    $scope.error = errorResponse.data.message;
                });
            });
        };
        $scope.numItemsPerPage = 30;
    }
]);

angular.module('impml').controller("sparklineCtrl", ["$scope", function ($scope) {
    return $scope.demoData1 = {data: [3, 1, 2, 2, 4, 6, 4, 5, 2, 4, 5, 3, 4, 6, 4, 7], options: {type: "line", lineColor: "#fff", highlightLineColor: "#fff", fillColor: "#60CD9B", spotColor: !1, minSpotColor: !1, maxSpotColor: !1, width: "100%", height: "150px"}}, $scope.simpleChart1 = {data: [3, 1, 2, 3, 5, 3, 4, 2], options: {type: "line", lineColor: "#31C0BE", fillColor: "#bce0df", spotColor: !1, minSpotColor: !1, maxSpotColor: !1}}, $scope.simpleChart2 = {data: [3, 1, 2, 3, 5, 3, 4, 2], options: {type: "bar", barColor: "#31C0BE"}}, $scope.simpleChart3 = {data: [3, 1, 2, 3, 5, 3, 4, 2], options: {type: "pie", sliceColors: ["#31C0BE", "#60CD9B", "#E87352", "#8170CA", "#EEC95A", "#60CD9B"]}}, $scope.tristateChart1 = {data: [1, 2, -3, -5, 3, 1, -4, 2], options: {type: "tristate", posBarColor: "#95b75d", negBarColor: "#fa8564"}}, $scope.largeChart1 = {data: [3, 1, 2, 3, 5, 3, 4, 2], options: {type: "line", lineColor: "#674E9E", highlightLineColor: "#7ACBEE", fillColor: "#927ED1", spotColor: !1, minSpotColor: !1, maxSpotColor: !1, width: "100%", height: "150px"}}, $scope.largeChart2 = {data: [3, 1, 2, 3, 5, 3, 4, 2], options: {type: "bar", barColor: "#31C0BE", barWidth: 10, width: "100%", height: "150px"}}, $scope.largeChart3 = {data: [3, 1, 2, 3, 5], options: {type: "pie", sliceColors: ["#31C0BE", "#60CD9B", "#E87352", "#8170CA", "#EEC95A", "#60CD9B"], width: "150px", height: "150px"}}
}]);

angular.module('impml').directive("sparkline", [function () {
    return {
        restrict: "A", scope: {data: "=", options: "="}, link: function (scope, ele) {
            var data, options, sparkResize, sparklineDraw;
            return data = scope.data, options = scope.options, sparkResize = void 0, sparklineDraw = function () {
                return ele.sparkline(data, options)
            }, $(window).resize(function () {
                return clearTimeout(sparkResize), sparkResize = setTimeout(sparklineDraw, 200)
            }), sparklineDraw()
        }
    }
}]);