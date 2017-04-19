/**
 * Created by Administrator on 2017/4/19.
 */
;(function (angular) {
    angular.module('app').directive('authorlist',function () {
        return{
            restrict:'EA',
            templateUrl:'view/tpl/authorlist.html'
        }
    })
})(angular);