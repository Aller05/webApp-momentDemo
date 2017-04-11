/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').controller('homeController',['$scope','$state','myHttp',function ($scope,$state,myHttp) {
        //一进来该控制器就将路由跳转
        $state.go('app.home');
        //定义用于反盗链的前缀地址
        $scope.fangdaolian = 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=';
        var args = {
            url:'http://192.168.34.248/api/home.php',
            method:'jsonp',
            params:null
        };
        myHttp.getHttp(args,function (res) {
            console.log(res);
            $scope.homelist = res.posts;
        },function (err) {
            console.log(err);
        });

    }])
})(angular);