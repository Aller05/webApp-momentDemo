/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').controller('pastController',['$scope','myHttp','$location',function ($scope,myHttp,$location) {
        $scope.pastnow = true;
        //定义用于反盗链的前缀地址
        $scope.fangdaolian = 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=';
        var num = 1,data = new Date();
        $scope.homelist = [];

        $scope.pastData = function () {
            $scope.isLoading = true;
            var day = data.getFullYear()+'-'+(data.getMonth()+1)+'-'+(data.getDate()-num);
            var args = {
                url:'http://139.199.107.194:8088/moment/past.php',
                method:'jsonp',
                params:{
                    index:day
                }
            };
            myHttp.getHttp(args,function (res) {
                res.posts[0].topdata = res.date;
                for (var i = 0; i < res.posts.length; i++) {
                    $scope.homelist.push(res.posts[i])
                }
                console.log($scope.homelist);
                //数据获取后,取消加载状态,即为加载完成
                $scope.isLoading = false;
            },function (err) {
                console.log(err);
            });
        };
        $scope.pastData();//第一次启动程序时调用获取初始数据


        $scope.scrollaa = function () {
            //只有在past页面,并且上一次加载数据已经完成,才可以触发
            if($location.url() == '/app/past' && !$scope.isLoading){
                console.log(123);
                num++;
                $scope.pastData();
            }
        }
    }])
})(angular);