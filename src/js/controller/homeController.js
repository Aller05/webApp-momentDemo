/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').controller('homeController',['$scope','$state','myHttp',function ($scope,$state,myHttp) {
        //程序刚启动时,使其处于加载状态
        $scope.isLoading = true;
        $scope.isDetailCss = false;
        //定义用于反盗链的前缀地址
        $scope.fangdaolian = 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=';
        var args = {
            url:'http://139.199.107.194:8088/moment/homelist.php',
            method:'jsonp',
            params:null
        };
        myHttp.getHttp(args,function (res) {
            console.log(res);
            $scope.homelist = res.posts;
            //数据获取后,取消加载状态,即为加载完成
            $scope.isLoading = false;
        },function (err) {
            console.log(err);
        });


    }])
})(angular);