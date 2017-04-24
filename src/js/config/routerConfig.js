/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    //多视图 ==> 视图模板再次作为视图,控制器跳转到app下的子路由 ==>子路由模板直接插入组件(指令) ==>组件(指令)中发送请求,指令模板为当前视图的真正内容.
    angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('app/home');
        $stateProvider.state('app',{
            url:'/app',
            views:{
                home:{
                    templateUrl:'view/home_tpl.html',
                    controller:'homeController'
                },
                past:{
                    templateUrl:'view/past_tpl.html',
                    controller:'pastController'
                },
                author:{
                    templateUrl:'view/author_tpl.html',
                    controller:'authorController'
                },
                content:{
                    // templateUrl:'view/home_tpl.html',
                    // controller:'homeController'
                },
                my:{
                    templateUrl:'view/iLike_tpl.html',
                    controller:'iLikeController'
                }
            }
        }).state('app.home',{
            url:'/home',
            template:'<homelist></homelist>',
            controller:[function () {
                window.scrollTo(0,50000);
            }],
            //10001 无图  10002有图有文字  10003有图无文字
        }).state('app.past',{
            url:'/past',
            controller:[function () {
                window.scrollTo(0,0);
            }],
            template:'<homelist></homelist>'
        }).state('app.detail',{
            url:'/detail',
            template:'<detail></detail>',
        }).state('app.author',{
            url:'/author',
            template:'<authorlist></authorlist>'
        }).state('app.authordetail',{
            url:'/authordetail',
            template:'<homelist></homelist>'
        }).state('app.iLike',{
            url:'/iLike',
            template:'<homelist></homelist>',
            controller:[function () {
                window.scrollTo(0,0);
            }]
        });
    }]);
    //home的路由不管怎么跳转,都在home视图内,所以都属于home控制器范围.
})(angular);
