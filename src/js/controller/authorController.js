/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').controller('authorController',['$scope','myHttp','$timeout','$rootScope',function ($scope,myHttp,$timeout,$rootScope) {
        $scope.isLoading = true;
        var args = {
            url:'http://139.199.107.194:8088/moment/authorlist.php',
            method:'jsonp',
            params:null
        };
        myHttp.getHttp(args,function (res) {
            $scope.authrolist = res.authors;
            //数据获取后,取消加载状态,即为加载完成
            $scope.isLoading = false;
        },function (err) {
            console.log(err);
        });

        //接收来自主控制器的广播,想服务器请求作者主页数据
        $scope.$on('authorDetailObj',function (event, data) {
            //loading动画,请求数据时显示动画
            $scope.isLoading = true;
            var args = {
                url:'http://139.199.107.194:8088/moment/author.php',
                method:'jsonp',
                params:{//该id为作者的id编号,用于向服务器请求点击的作者详细数据
                    id:data.uid
                }
            };
            myHttp.getHttp(args,function (res) {
                //该命名和home的list一样,因为复用了homelist指令,但是此时控制器归authorController,所以并不会冲突.
                $scope.homelist = res.posts;
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