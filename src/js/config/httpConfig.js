/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').config(['$sceDelegateProvider',function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://192.168.34.248/api/**'
        ])
    }])
})(angular);