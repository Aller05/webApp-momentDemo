/**
 * Created by Administrator on 2017/4/19.
 */
;(function (angular) {
    angular.module('app').directive('login',['$timeout',function ($timeout) {
        return{
            restrict:'EA',
            templateUrl:'view/tpl/login_tpl.html',
            link:function ($scope, ele, attr) {
                //如果点击清空按钮,会因为输入框先失去焦点而导致清空按钮隐藏,所以加定时器
                $scope.blur = function (val) {
                    $timeout(function () {
                        if(val == 'user'){
                            $scope.userblur = false;
                        }else{
                            $scope.passwordblur = false;
                        }
                    },100);
                };

            }
        }
    }])
})(angular);