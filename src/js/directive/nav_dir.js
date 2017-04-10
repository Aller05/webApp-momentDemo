/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').directive('nav',['$location',function ($location) {
        return{
            restrict:'EA',
            templateUrl:'view/tpl/nav_tpl.html',
            link:function ($scope, ele, attr) {
                //初始时,显示导航,隐藏返回
                //监听锚点变化,当进入详情时,隐藏导航,显示返回
                //返回图标点击时,历史回退,导航显示,返回隐藏
                ele.find('img')[1].style.display='none';
                $scope.$location = $location;
                $scope.$watch('$location.url()',function (newValue, oldValue) {
                    if( newValue != '/app/home'){
                        ele.find('img')[0].style.display='none';
                        ele.find('img')[1].style.display='block';
                    }
                });

                $scope.goBack = function () {
                    window.history.back();
                    ele.find('img')[0].style.display='block';
                    ele.find('img')[1].style.display='none';
                }
            }

        }
    }])
})(angular);