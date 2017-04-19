/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').config(['$sceDelegateProvider',function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://139.199.107.194:8088/**',
            'http://127.0.0.1/api/**'
        ])
    }])
})(angular);