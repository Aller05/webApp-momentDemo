/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').controller('pastController',['$scope','myHttp','$location','$timeout',function ($scope,myHttp,$location,$timeout) {
        $scope.pastnow = true;//当前在past页面状态为真
        $scope.isLoading = true;
        var dayNum = -1,mouthNum = 1,data = new Date();
        if(data.getDate() == 1){
            dayNum = 29;
            mouthNum = 0;
        }
        $scope.homelist = [];//定义空数组用来存放数据
        $scope.pastData = function () {
            $scope.isLoading = true;
            var day = data.getFullYear()+'-'+(data.getMonth()+mouthNum)+'-'+(data.getDate()+dayNum);
            var args = {
                url:'http://139.199.107.194:8088/moment/past.php',
                method:'jsonp',
                params:{
                    index:day
                }
            };
            myHttp.getHttp(args,function (res) {
                res.posts[1].topdate = res.date;
                res.posts[1].isPast = true;
                for (var i = 1; i < res.posts.length; i++) {
                    $scope.homelist.push(res.posts[i])
                }
                //数据获取后,取消加载状态,即为加载完成
                $scope.isLoading = false;
            },function (err) {
                console.log(err);
            });
        };
        $scope.pastData();//第一次启动程序时调用获取初始数据

        //past页面滚动加载更多数据
        $scope.pastMore = function () {
            if($scope.isLoading){//如果状态为加载中,直接跳出
                return
            }
            $timeout.cancel(timer);
            var timer = $timeout(function () {
                //加定时器防止从past到其他页面跳转的瞬间发生滚动触发事件
                if($location.url() == '/app/past' && !$scope.isLoading){
                    dayNum--;
                    if((data.getDate()+dayNum)==0){
                        dayNum = (30-data.getDate());
                        mouthNum--;
                    }
                    $scope.pastData();
                }
            },40);
        };
        //控制往期内容的时间标题
        $scope.flag = true;
        $(window).scroll(function () {
            if($scope.flag){
                $scope.flag = false;
                $timeout(function () {
                    $('.isPastNow').each(function () {
                        if( ($(window).scrollTop()+175) >= $(this).parent().offset().top ){
                            $(this).addClass('pastListDate');
                         }else{
                            $(this).removeClass('pastListDate');
                        }
                    });
                    $scope.flag = true;
                },50)
            }

        })

    }])
})(angular);