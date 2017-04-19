/**
 * Created by Vittorio on 13/04/2017.
 */
angular.module('settings').factory('Settings', ['$resource', function ($resource) {
    return $resource('/api/settings/:settingId', {
        settingId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);