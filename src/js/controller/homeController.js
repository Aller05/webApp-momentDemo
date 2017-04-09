/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').controller('homeController',['$scope','$state','myHttp','$stateParams',function ($scope,$state,myHttp,$stateParams) {
        $state.go('app.home');
        $scope.fangdaolian = 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=';
        var args = {
            url:'http://localhost/api/home.php',
            method:'jsonp',
            params:null
        };
        myHttp.getHttp(args,function (res) {
            console.log(res);
            $scope.homelist = res.posts;
        },function (err) {
            console.log(err);
        });
        $scope.$on('index',function (e, data) {
            console.log(data);
        })

    }])



})(angular);