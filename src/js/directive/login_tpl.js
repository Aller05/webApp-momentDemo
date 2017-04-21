/**
 * Created by Administrator on 2017/4/19.
 */
;(function (angular) {
    angular.module('app').directive('login',function () {
        return{
            restrict:'EA',
            templateUrl:'view/tpl/login_tpl.html'
        }
    })
})(angular);