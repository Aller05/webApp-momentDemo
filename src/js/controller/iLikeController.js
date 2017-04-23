/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').controller('iLikeController',['$scope','$location',function ($scope,$location) {
        $scope.fangdaolian = 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=';
        $scope.homelist = $scope.iLike;
    }])
})(angular);