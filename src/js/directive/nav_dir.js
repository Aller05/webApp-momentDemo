/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').directive('nav',['$location','$timeout','$state',function ($location,$timeout,$state) {
        return{
            restrict:'EA',
            templateUrl:'view/tpl/nav_tpl.html',
            link:function ($scope, ele, attr) {
                //接收来自tabbar的广播,用于保存一级页面title名,用于从二级跳回到一级页面时更改nav的title
                $scope.$on('calltitle',function (event, data) {
                    $scope.preTitleName = data.title;
                });
                //初始时,显示导航图标,隐藏返回图标
                //监听锚点变化,当进入详情时,隐藏导航,显示返回
                //返回图标点击时,历史回退,导航显示,返回隐藏
                ele.find('img')[1].style.display='none';
                $scope.$location = $location;
                $scope.$watch('$location.url()',function (newValue, oldValue) {
                    // console.log(newValue, oldValue);
                    if( newValue != '/app/home' && newValue != '/app/author'){
                        ele.find('img')[0].style.display='none';
                        ele.find('img')[1].style.display='block';
                    }
                });
                $scope.goBack = function () {
                    window.history.back();
                    ele.find('img')[0].style.display='block';
                    ele.find('img')[1].style.display='none';
                    $timeout(function () {
                        $scope.isDetailCss = true;
                    },1);
                    //如果上面的广播接收到了值,那么就修改,否则不修改.
                    if($scope.preTitleName){
                        $scope.title = $scope.preTitleName;
                    }


                }
            }

        }
    }])
})(angular);