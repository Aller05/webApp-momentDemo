/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').directive('homelist',function () {
        return{
            restrict:'EA',
            templateUrl:'view/tpl/homelist_tpl.html'
        }
    })
})(angular);
