/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    //多视图 ==> 视图模板再次作为视图,控制器跳转到app下的子路由 ==>子路由模板直接插入组件(指令) ==>组件(指令)中发送请求,指令模板为当前视图的真正内容.
    angular.module('app').config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
        $stateProvider.state('app',{
            url:'/app',
            views:{
                home:{
                    templateUrl:'view/home_tpl.html',
                    controller:'homeController'
                },
                past:{
                    // templateUrl:'view/home_tpl.html',
                    // controller:'homeController'
                },
                author:{
/*                    templateUrl:'view/home_tpl.html',
                    controller:'homeController'*/
                },
                content:{
                    // templateUrl:'view/home_tpl.html',
                    // controller:'homeController'
                },
                my:{
                    // templateUrl:'view/home_tpl.html',
                    // controller:'homeController'
                }
            }
        }).state('app.home',{
            url:'/home',
            template:'<homelist></homelist>'
            //10001 无图  10002有图有文字  10003有图无文字
        }).state('app.detail',{
            url:'/detail/:index',
            //根据参数的索引值,取出当前点击的为哪一个,获取详细内容
            controller:['$scope','$stateParams',function ($scope, $stateParams) {
                $scope.listItem = $scope.homelist[$stateParams.index];
            }],
            template:'<detail></detail>'
        });
        $urlRouterProvider.otherwise('app/home');
    }]);
    //home的路由不管怎么跳转,都在home视图内,所以都属于home控制器范围.
})(angular);
