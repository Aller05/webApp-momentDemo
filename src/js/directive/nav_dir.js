/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').directive('nav',['$location','$timeout','$state',function ($location,$timeout,$state) {
        return{
            restrict:'EA',
            templateUrl:'view/tpl/nav_tpl.html',
            link:function ($scope, ele, attr) {
                //接收来自tabbar的广播,用于保存一级页面title名,用于从二级跳回到一级页面时更改nav的title
                $scope.$on('calltitle',function (event, data) {
                    $scope.preTitleName = data.title;
                });
                //接收来自appCon的广播,保存进入详情页之前滚动偏移量以及当前详情对象
                $scope.$on('preScroll',function (event,data) {
                    $scope.scrollToY = data.scrollNum;
                    $scope.detailObj = data.detailObj;
                    //当我喜欢的列表为空时,显示白色心
                    if($scope.iLike.length == 0){
                        $scope.isInLike = false;
                    }else{//否则查找
                        for (var i = 0; i < $scope.iLike.length; i++) {
                            if($scope.iLike[i].id == $scope.detailObj.id){
                                $scope.isInLike = true;
                                //保存该索引值,用于取消收藏
                                $scope.theLikeIndex = i;
                                break;
                            }else{
                                $scope.isInLike = false;
                            }
                        }
                    }
                });
                //点击白色心,添加到收藏列表,并显示红色心
                $scope.saveLike = function () {
                    $scope.isInLike = true;
                    //收藏数+1
                    $scope.detailObj.like_count++;
                    $scope.iLike.unshift($scope.detailObj);
                };
                //点击红色心,取消收藏,然后显示白色心
                $scope.deleteLike = function () {
                    $scope.isInLike = false;
                    //收藏数-1
                    $scope.detailObj.like_count--;
                    $scope.iLike.splice($scope.theLikeIndex,1);
                };

                //初始时,显示导航图标,隐藏返回图标
                //监听锚点变化,当进入详情时,隐藏导航,显示返回
                //返回图标点击时,历史回退,导航显示,返回隐藏
                ele.find('a')[1].style.display='none';
                ele.find('a')[2].style.opacity= 0;
                $scope.$location = $location;
                $scope.$watch('$location.url()',function (newValue, oldValue) {
                    if(newValue.indexOf('detail') != '-1'){
                        ele.find('a')[0].style.display='none';
                        ele.find('a')[1].style.display='block';
                        ele.find('a')[2].style.opacity= 1;
                        if(newValue.indexOf('author') != '-1'){
                            //在作者详情页时不显示
                            ele.find('a')[2].style.opacity= 0;
                        }
                    }
                    //下面两个判断用于辅助判断isLoading(在homelist模板上的)
                    //当在past页面时,不添加isLoading类,不要首页的载入中效果
                    else if(newValue == '/app/past'){
                        $scope.helpLoading = false;
                    }else{
                        $scope.helpLoading = true;
                    }
                });
                $scope.goBack = function () {
                    ele.find('a')[0].style.display='block';
                    ele.find('a')[1].style.display='none';
                    ele.find('a')[2].style.opacity= 0;
                    $timeout(function () {
                        $scope.isDetailCss = true;
                    },1);
                    //如果上面的广播接收到了值,那么就修改,否则不修改.
                    if($scope.preTitleName){
                        $scope.title = $scope.preTitleName;
                    }
                    window.history.back();
                    //将页面滚动到进入详情页之前的位置
                    $('body').animate({scrollTop:$scope.scrollToY},15);
                    //我喜欢的列表中第一个添加数量标题
                    if($scope.iLike.length>0){
                        $scope.iLike[$scope.iLike.length-1].likeNum = '喜欢('+$scope.iLike.length+')';
                    }
                };
                $scope.$on('swipeBack',function () {
                    $scope.goBack();
                });
            }
        }
    }])
})(angular);