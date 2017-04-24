/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').controller('homeController',['$scope','myHttp','$stateParams','$window','$timeout','$rootScope',function ($scope,myHttp,$stateParams,$window,$timeout,$rootScope) {
        //用于在homelist模板中辅助判断列表样式是大视图还是小视图
        $scope.pastnow = false;
        //程序刚启动时,使其处于加载状态
        $scope.isLoading = true;
        //程序刚启动时,详情页是否向右侧位移100%为真,就是默认隐藏在右侧.
        $scope.isDetailCss = true;
        var args = {
            url:'http://139.199.107.194:8088/moment/homelist.php',
            method:'jsonp',
            params:null
        };
        myHttp.getHttp(args,function (res) {
            res.posts[0].topdate = res.date;
            $scope.homelist = res.posts;
            //数据获取后,取消加载状态,即为加载完成
            $scope.isLoading = false;
            //获取到数据后向懒加载插件内发送刷新广播,为了修复第一次打开页面不滚动图片
            $timeout(function(){ $rootScope.$emit('lazyImg:refresh'); },1000);
        },function (err) {
            console.log(err);
        });
    }])
})(angular);