/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    var app = angular.module('app',['ui.router','ngTouch','ngTap','infinite-scroll','angularLazyImg']);
    app.controller('appController',['$scope','$location',function ($scope,$location) {
        //用于激活移动端a标签伪类效果
        document.body.addEventListener('touchstart', function () { });
        $scope.$location = $location;
        $scope.title = '今日一刻';
        $scope.isNav = false;//记录是否点击了导航图标
        $scope.loginIn = false;//初始化时,登录框为隐藏状态
        $scope.iLike = [];//我喜欢的视图数据对象数组,初始化为0;
        $scope.click = function (type) {//导航栏点击时切换顶部文字
            $scope.title = type;
            $scope.isNav = !$scope.isNav;
            $scope.$broadcast('calltitle',{title:type})
        };
        //定义用于反盗链的前缀地址,用于detail_tpl指令图片地址的拼接
        $scope.fangdaolian = 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=';

        //热门作者列表某一作者被点击时,修改nav标题名字,并且向author控制器发送广播,通知其向服务器获取数据
        $scope.authortitle = function (obj) {
            $scope.title = obj.name+'的主页';
            $scope.$broadcast('authorDetailObj',obj);
        };
        //监听窗口点击,当tabbar显示并且点击的id不是tabbar,则说明点击的要么是tarbar里的选项,要么就是右侧的内容页,那么就把导航隐藏掉,并且阻止冒泡,防止内容页发生路由跳转,helpTarget代表热门作者和栏目浏览
        $scope.autoNav = function () {
            $scope.homeItem = document.getElementsByTagName('homelist').length >0 ? document.getElementsByTagName('homelist') : document.getElementsByClassName('helpTarget');
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
        //当点击列表进入详情页时,并向nav_dir指令发送广播传送进入前的滚动偏移量,以及当前详情对象
        //并且保存传入的详情对象,用于详情页的内容展示
        $scope.toDetail = function (obj) {
            $scope.listItem = obj;
            $scope.$broadcast('preScroll',{
                scrollNum:$('body').scrollTop(),
                detailObj:obj
            });
        };
        //监听锚点变化,当在'我喜欢的'页面时,修改状态
        $scope.$location = $location;
        $scope.$watch('$location.url()',function (newValue,oldValue) {
            if(newValue == '/app/iLike'){
                $scope.isLikeNow = true;
            }else{
                $scope.isLikeNow = false;
            }
        });

    }])
})(angular);