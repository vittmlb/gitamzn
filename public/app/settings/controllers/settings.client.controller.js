/**
 * Created by Vittorio on 13/04/2017.
 */
angular.module('settings').controller('SettingsController', ['$scope', '$stateParams', '$location', 'Settings', 'ngToast',
    function($scope, $stateParams, $location, Settings, ngToast) {
        let a = 10;

        $scope.create = function() {
            let setting = new Settings({
                amazon: this.amazon
            });
            setting.$save(function (response) {
                $location.path('/settings/' + response._id)
            }, function(errorResponse) {
                console.log(errorResponse);
            });
        };

        $scope.find = function() {
            $scope.settings = Settings.query();
        };

        $scope.findOne = function() {
            $scope.setting = Settings.get({
                settingId: $stateParams.settingId
            });
        };

        $scope.update = function() {
            $scope.setting.$update(function (response) {
                $location.path('/settings/' + response._id);
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

        $scope.delete = function() {
            $scope.setting.$remove(function () {
                $location.path('/settings');
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

    }
]);