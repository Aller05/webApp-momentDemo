/**
 * Created by Administrator on 2017/4/9.
 */
;(function (angular) {
    angular.module('app').directive('detail',['$timeout','$window',function ($timeout,$window) {
        return{
            restrict:'EA',
            template:'<div id="detail-content"  ng-class="{detailCss:isDetailCss}" ></div>',
            link:function ($scope, ele, attr) {
/*总思路:因为获取到的详情内有图片,但是没有图片地址,每个详情页的图片第一个和最后一个都是作者头像,中间的图片与json数据内photo的数据一致,而且顺序也一致,所以有了以下逻辑*/
                //0.一进入详情页,就将整个页面滚动到顶部
                window.scrollTo(0,0);
                //进入详情页时,添加定时器,等详情页已加载并将homelist替换后,过一定时间再去除位移类,就会有从右侧出现的动画效果.
                $timeout(function () {
                    $scope.isDetailCss = false;
                },20);
                //1.将获取到的html片段注入到指令内
                ele.html($scope.listItem.content);
                //2.获取所有的img标签
                var allImg = ele.find('img');
                //3.设置一个变量,用来排除所有图片中的首尾(作者头像)
                var exceptNum = 1;
                //4.有时服务器返回的数据,作者头像位置有两个img,其中一个多余的img类名为auth_author_mark
                //当该类名存在,排除变量变为2,并把多余的隐藏掉
                if(ele.find('.auth_author_mark').length>0){
                    exceptNum = 2;
                    allImg[1].style.display='none';
                    allImg[allImg.length-exceptNum].style.display='none';
                }
                if($scope.listItem.photos.length != 0){
                    for (var i = exceptNum; i < allImg.length-exceptNum; i++) {
                        //3.遍历时避开第一个和最后一个,拼接url地址
                        var url = $scope.listItem.photos[i-exceptNum].small.url;
                        //4.设置内容图片src属性
                        allImg[i].setAttribute('src',url);
                    }
                }
                //5.设置第一个和最后一个作者头像图片
                allImg[0].setAttribute('src',$scope.listItem.author.avatar);
                allImg[allImg.length-1].setAttribute('src',$scope.listItem.author.avatar);
            },
            replace:true
        }
    }])
})(angular);
