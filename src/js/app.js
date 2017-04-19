/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    var app = angular.module('app',['ui.router']);
    app.controller('appController',['$scope','$window',function ($scope,$window) {
        $scope.title = '今日一刻';
        $scope.isNav = false;//记录是否点击了导航图标
        $scope.click = function (type) {//导航栏点击时切换顶部文字
            $scope.title = type;
            $scope.isNav = !$scope.isNav;
            $scope.$broadcast('calltitle',{title:type})

        };
        //接收来自authordetail路由的控制器的广播,用来修改标题名字
        $scope.$on('authortitle',function (event, data) {
            $scope.title = data.title+'的主页';
        });

        //当导航按钮点击时,判断当前导航栏是存在还是不存在,存在就隐藏,隐藏就显示(通过添加类名实现).
        $scope.nav = function () {
            $scope.isNav = !$scope.isNav;
        };
    }])
})(angular);