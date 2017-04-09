/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').directive('nav',function () {
        return{
            restrict:'EA',
            templateUrl:'../view/tpl/nav_tpl.html'
        }
    })
})(angular);