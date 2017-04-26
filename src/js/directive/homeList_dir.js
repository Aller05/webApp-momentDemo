/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').directive('homelist',function () {
        return{
            restrict:'EA',
            templateUrl:'view/tpl/homelist_tpl.html',
            link:function ($scope, ele, attr) {
                window.scrollTo(0,0);
            }

        }
    })
})(angular);
