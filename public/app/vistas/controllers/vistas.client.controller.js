/**
 * Created by Vittorio on 28/09/2016.
 */
angular.module('vistas').controller('VistasController', ['$scope', '$stateParams', '$location', 'Vistas', 'ProdutosML', 'toaster', 'SweetAlert',
    function($scope, $stateParams, $location, Vistas, ProdutosML, toaster, SweetAlert) {

        $scope.sortkey = 'media.venda';
        $scope.reverse = true;
        $scope.reverseSort = function() {
            $scope.reverse = !$scope.reverse;
        };
        $scope.sort = function(keyname) {
            $scope.sortkey = keyname;
        };

        $scope.listaProdutosGeral = ProdutosML.query();
        $scope.listaProdutosVista = [];

        var SweetAlertOptions = {
            removerVista: {
                title: "Deseja remover a Vista?",
                text: "Você não poderá mais recuperá-la!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",confirmButtonText: "Sim, remover!",
                cancelButtonText: "Não, cancelar!",
                closeOnConfirm: false,
                closeOnCancel: false }
        };
        $scope.create = function() {
            var vista = new Vistas({
                nome_vista: this.nome_vista,
                descricao_vista: this.descricao_vista,
                produtos_vista: $scope.listaProdutosVista
            });
            vista.$save(function (response) {
                $location.path('/vistas/' + response._id);
            }, function(errorResponse) {
                console.log(errorResponse);
                toaster.pop({
                    type: 'error',
                    title: 'Erro',
                    body: errorResponse.data.message,
                    timeout: 4000
                });
            });
        };
        $scope.find = function() {
            $scope.vistas = Vistas.query();
        };
        $scope.findOne = function() {
            ProdutosML.query().$promise.then(function(lista) {
                $scope.listaProdutosGeral = lista;
                Vistas.get({
                    vistaId: $stateParams.vistaId
                }).$promise.then(function (data) {
                    $scope.vista = data;
                    carregaListasGeralVista();
                });
            });
        };
        $scope.update = function() {
            $scope.vista.$update(function (response) {
                $location.path('/vistas/' + response._id);
            }, function(errorResponse) {
                console.log(errorResponse);
                toaster.pop({
                    type: 'error',
                    title: 'Erro',
                    body: errorResponse.data.message,
                    timeout: 4000
                });
            });
        };
        $scope.delete = function (vista) {
            if(vista) {
                vista.$remove(function () {
                    for(var i in $scope.vistas) {
                        if($scope.vistas[i] === vista) {
                            $scope.vistas.splice(i, 1);
                        }
                    }
                }, function(errorResponse) {
                    console.log(errorResponse);
                    toaster.pop({
                        type: 'error',
                        title: 'Erro',
                        body: errorResponse.data.message,
                        timeout: 4000
                    });
                });
            } else {
                $scope.vista.$remove(function () {
                    $location.path('/vistas');
                }, function(errorResponse) {
                    console.log(errorResponse);
                    toaster.pop({
                        type: 'error',
                        title: 'Erro',
                        body: errorResponse.data.message,
                        timeout: 4000
                    });
                });
            }
        };
        $scope.deleteAlert = function(pais) {
            SweetAlert.swal(SweetAlertOptions.removerVista,
                function(isConfirm){
                    if (isConfirm) {
                        $scope.delete(pais);
                        SweetAlert.swal("Removido!", "A Vista foi removida.", "success");
                    } else {
                        SweetAlert.swal("Cancelado", "A Vista não foi removida :)", "error");
                    }
                });
        };

        $scope.addProdutoVista = function(produto) {
            $scope.listaProdutosVista.push(produto);
            var index = $scope.listaProdutosGeral.indexOf(produto);
            if(index > -1) {
                $scope.listaProdutosGeral.splice(index, 1);
            }
        };
        $scope.addProdutoVistaUpdate = function(produto) {
            $scope.vista.produtos_vista.push(produto);
            var index = $scope.listaProdutosGeral.indexOf(produto);
            if(index > -1) {
                $scope.listaProdutosGeral.splice(index, 1);
            }
        };
        $scope.removeProdutoVista = function(produto) {
            $scope.listaProdutosGeral.push(produto);
            var index = $scope.listaProdutosVista.indexOf(produto);
            if(index > -1) {
                $scope.listaProdutosVista.splice(index, 1);
            }
        };
        $scope.removeProdutoVistaUpdate = function(produto) {
            $scope.listaProdutosGeral.push(produto);
            var index = $scope.vista.produtos_vista.indexOf(produto);
            if(index > -1) {
                $scope.vista.produtos_vista.splice(index, 1);
            }
        };

        function carregaListasGeralVista() {
            for(var i in $scope.vista.produtos_vista) {
                $scope.listaProdutosVista.push($scope.vista.produtos_vista[i]);
                var index = $scope.listaProdutosGeral.map(function (el) {
                    return el._id;
                }).indexOf($scope.vista.produtos_vista[i]._id);
                if(index > -1) {
                    $scope.listaProdutosGeral.splice(index, 1);
                }
            }

        }



        $scope.carregaVista = function(vista) {
            $scope.vista = Vistas.get({
                vistaId: vista._id
            });
        };

    }
]);