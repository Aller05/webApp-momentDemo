/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    var app = angular.module('app',['ui.router']);
    app.controller('appController',['$scope','$location',function ($scope,$location) {
        $scope.title = '今日一刻';
        $scope.isNav = false;//记录是否点击了导航图标
        $scope.click = function (type) {//导航栏点击时切换顶部文字
            $scope.title = type;
        };
        $scope.$location = $location;
        $scope.$watch('$location.url()',function (newVal, oldVal) {
            console.log(newVal, oldVal);
        });


        //当导航按钮点击时,判断当前导航栏是存在还是不存在,存在就隐藏,隐藏就显示(通过添加类名实现).
        $scope.nav = function () {
            if($scope.isNav){
                $scope.isNav = false;
            }else{
                $scope.isNav = true;
            }
        };

    }])
})(angular);