/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').controller('iLikeController',['$scope',function ($scope) {
       $scope.homelist = $scope.iLike;
    }])
})(angular);