/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').controller('authorController',['$scope','myHttp','$timeout','$rootScope','$location',function ($scope,myHttp,$timeout,$rootScope,$location) {
        $scope.isLoading = true;
        $scope.noMore = false;//没有更多了提示,默认隐藏
        var start = 0, count=20;
        $scope.authrolist = [];//热门作者列表数组

        $scope.authroListData = function (sta,cou) {
            $scope.isLoading = true;
            var args = {
                url:'http://139.199.107.194:8088/moment/authorlist.php',
                method:'jsonp',
                params:{
                    start:sta,
                    count:cou
                }
            };
            myHttp.getHttp(args,function (res) {
                for (var i = 0; i < res.authors.length; i++) {
                    $scope.authrolist.push(res.authors[i]);
                }
                $scope.authorlistTotal = res.total;
                //数据获取后,取消加载状态,即为加载完成
                $scope.isLoading = false;
            },function (err) {
                console.log(err);
            });
        };
        //程序启动调用一次,获取初始数据
        $scope.authroListData(start,count);
        //滚动到底部加载更多数据
        $scope.authorListMore = function () {
            //如果上一次数据加载还没结束,或者当前路由不是热门作者直接return
            if($scope.isLoading || $location.url() != '/app/author'){
                return;
            }
            $timeout.cancel(timer);//节流
            var timer = $timeout(function () {
                start +=count;
                if(start>=$scope.authorlistTotal){
                    //如果开始数值大于数据总条数,不加载,显示没有更多提示
                    $scope.noMore = true;
                    return;
                }
                $scope.authroListData(start,count);
            },40);
        };
        //接收来自主控制器的广播,想服务器请求作者主页数据
        $scope.$on('authorDetailObj',function (event, data) {
            //loading动画,请求数据时显示动画
            $scope.isLoading = true;
            var args = {
                url:'http://127.0.0.1/api/author.php',
                method:'jsonp',
                params:{//该id为作者的id编号,用于向服务器请求点击的作者详细数据
                    id:data.uid
                }
            };
            myHttp.getHttp(args,function (res) {
                //该命名和home的list一样,因为复用了homelist指令,但是此时控制器归authorController,所以并不会冲突.
                $scope.homelist = res.posts;
                console.log(res);
                $scope.authormsg = res.author;
                $scope.isLoading = false;//请求完数据隐藏
                //获取到数据后向懒加载插件内发送刷新广播,为了修复第一次打开页面不滚动图片
                $timeout(function(){ $rootScope.$emit('lazyImg:refresh'); },1000);
            },function (err) {
                console.log(err);
            });
        });
    }])
})(angular);