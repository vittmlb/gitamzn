/**
 * Created by Vittorio on 13/04/2017.
 */
angular.module('settings').config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('setting_create', {
            url: '/settings/create',
            templateUrl: 'app/settings/views/create-setting.client.view.html',
            controller: 'SettingsController'
        })
        .state('setting_list', {
            url: '/settings',
            templateUrl: 'app/settings/views/list-settings.client.view.html',
            controller: 'SettingsController'
        })
        .state('setting_view', {
            url: '/settings/:settingId',
            templateUrl: 'app/settings/views/view-setting.client.view.html',
            controller: 'SettingsController'
        })
        .state('setting_edit', {
            url: '/settings/:settingId/edit',
            templateUrl: 'app/settings/views/edit-setting.client.view.html',
            controller: 'SettingsController'
        });
}]);