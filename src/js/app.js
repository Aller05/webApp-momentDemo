/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    var app = angular.module('app',['ui.router']);
    app.controller('appController',['$scope','$stateParams',function ($scope,$stateParams) {
        $scope.title = '今日一刻';

        $scope.click = function (type) {
            $scope.title = type;
        };
        $scope.$broadcast('index',$stateParams.index);
    }])
})(angular);