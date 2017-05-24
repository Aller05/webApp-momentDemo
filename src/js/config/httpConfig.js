/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').run(function() {
        FastClick.attach(document.body);
    });
    angular.module('app').config(['$sceDelegateProvider',function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://115.159.45.169/**',
            'http://127.0.0.1/api/**'
        ])
    }])
})(angular);