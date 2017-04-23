/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    var app = angular.module('app',['ui.router','ngTouch','infinite-scroll']);
    app.controller('appController',['$scope','$location','$state',function ($scope,$location,$state) {
        //用于激活移动端a标签伪类效果
        document.body.addEventListener('touchstart', function () { });
        $scope.$location = $location;
        $scope.title = '今日一刻';
        $scope.isNav = false;//记录是否点击了导航图标
        $scope.loginIn = false;//初始化时,登录框为隐藏状态
        $scope.click = function (type) {//导航栏点击时切换顶部文字
            $scope.title = type;
            $scope.isNav = !$scope.isNav;
            $scope.$broadcast('calltitle',{title:type})
        };
        //接收来自authordetail路由的控制器的广播,用来修改标题名字
        $scope.$on('authortitle',function (event, data) {
            $scope.title = data.title+'的主页';
        });
        //监听窗口点击,当tabbar显示并且点击的id不是tabbar,则说明点击的要么是tarbar里的选项,要么就是右侧的内容页,那么就把导航隐藏掉,并且组织冒泡,防止内容页发生路由跳转
        $scope.autoNav = function () {
            $scope.homeItem = document.getElementsByTagName('homelist').length >0 ? document.getElementsByTagName('homelist') : document.getElementsByClassName('author-list');
            angular.forEach($scope.homeItem,function (data, index, array) {
                data.addEventListener('click',function () {
                    if(event.target.id != 'tabbar' && $scope.isNav){
                        $scope.isNav = !$scope.isNav;
                        $scope.$apply();
                        event.stopPropagation();
                    }
                },true)
            });
        };

        $scope.swipeRight = function () {
            //当锚点包含defail时,说明在详情页,此时右滑相当于点击了后退箭头,所以给nav指令发广播
            if($location.url().indexOf('detail') != '-1'){
                $scope.$broadcast('swipeBack');
            }else{//其他情况一律让导航跳出
                $scope.isNav = !$scope.isNav;
                $scope.autoNav();//导航显示后,调用该方法监听点击
            }
        };
        //左滑动定义在body上,这样不管是在tabbar上还是详情页上左滑都可以起作用
        $scope.swipeLeft = function () {
            if($scope.isNav){//只有在导航显示的情况下才执行
                $scope.isNav = !$scope.isNav;
            }
        };
        //当导航按钮点击时,判断当前导航栏是存在还是不存在,存在就隐藏,隐藏就显示(通过添加类名实现).
        $scope.nav = function () {
            $scope.isNav = !$scope.isNav;
            event.stopPropagation();
            $scope.autoNav();//导航显示后,调用该方法监听点击
        };
        //今日一刻页面底部的跳转按钮
        $scope.goPast = function () {
            $scope.title = '往期内容';
        };
        //当点击列表进入详情页时,保存进入前的滚动偏移量,并向nav_dir指令发送广播
        $scope.toDetail = function () {
            $scope.$broadcast('preScroll',$('body').scrollTop());

        }

    }])
})(angular);