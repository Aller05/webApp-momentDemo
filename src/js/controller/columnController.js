/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').controller('columnController',['$scope','myHttp','$stateParams','$window','$timeout','$rootScope',function ($scope,myHttp,$stateParams,$window,$timeout,$rootScope) {
        //程序刚启动时,使其处于加载状态
        $scope.isLoading = true;
        //在'栏目浏览'不显示小标题
        $scope.noSmallTitle = true;
        var args = {
            url:'http://115.159.45.169/api/column.php',
            method:'jsonp',
            params:null
        };
        myHttp.getHttp(args,function (res) {
            $scope.columns = res.columns;
            //数据获取后,取消加载状态,即为加载完成
            $scope.isLoading = false;
            //获取到数据后向懒加载插件内发送刷新广播,为了修复第一次打开页面不滚动图片
            $timeout(function(){ $rootScope.$emit('lazyImg:refresh'); },1000);
        },function (err) {
            console.log(err);
        });

        //获取栏目详情列表数据
        $scope.toColumnDetail = function (column) {
            //保存传入的栏目对象,用于在栏目详情显示标题内容数据
            $scope.columnDetailId = column;
            //用于在homelist模板中辅助判断列表样式是大视图还是小视图
            $scope.pastnow = true;
            //程序刚启动时,使其处于加载状态
            $scope.isLoading = true;
            var args = {
                url:'http://115.159.45.169/api/columnDetail.php',
                method:'jsonp',
                params:{
                    id:column.id
                }
            };
            myHttp.getHttp(args,function (res) {
                $scope.homelist = res.posts;
                //数据获取后,取消加载状态,即为加载完成
                $scope.isLoading = false;
                //获取到数据后向懒加载插件内发送刷新广播,为了修复第一次打开页面不滚动图片
                $timeout(function(){ $rootScope.$emit('lazyImg:refresh'); },1000);
            },function (err) {
                console.log(err);
            });
        }
    }])
})(angular);