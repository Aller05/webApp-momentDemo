/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').controller('pastController',['$scope','myHttp',function ($scope,myHttp) {
        $scope.isLoading = true;
        var num = 0,data = new Date();
        // num++;
        var day = data.getFullYear()+'-'+(data.getMonth()+1)+'-'+(data.getDate()-1);

        //定义用于反盗链的前缀地址
        $scope.fangdaolian = 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=';
        var args = {
            url:'http://139.199.107.194:8088/moment/past.php',
            method:'jsonp',
            params:{
                index:day
            }
        };
        myHttp.getHttp(args,function (res) {
            $scope.homelist = res.posts;
            console.log($scope.homelist);
            //数据获取后,取消加载状态,即为加载完成
            $scope.isLoading = false;
        },function (err) {
            console.log(err);
        });
    }])
})(angular);