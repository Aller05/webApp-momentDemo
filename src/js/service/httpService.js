/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) { //封装ajax,提高扩展性
    angular.module('app').service('myHttp',['$http',function ($http) {
        this.getHttp = function (args, success, error) {
            if(args.method == 'post'){
                var res = '';
                for(var key in args.params){
                    res += key + '=' + args.params[key] + '&';
                }
                res = res.slice(0,-1);
                $http({
                    url:args.url,
                    method:args.method,
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data:res
                }).then(function (res) {
                    success(res.data);
                }).catch(function (err) {
                    error(err)
                })
            }else if(args.method == 'get' || args.method == 'jsonp'){
                $http({
                    url:args.url,
                    method:args.method,
                    params:args.params
                }).then(function (res) {
                    success(res.data);
                }).catch(function (err) {
                    error(err);
                })
            }
        }
    }]);
})(angular);