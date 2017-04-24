/**
 * Created by Administrator on 2017/4/8.
 */
;(function (angular) {
    angular.module('app').config(['lazyImgConfigProvider', function(lazyImgConfigProvider){
        var scrollable = document.querySelector('#scrollable');
        lazyImgConfigProvider.setOptions({
            offset       : 100,
            errorClass   : null,
            successClass : 'imgAnimate',
            onError      : function(){},
            onSuccess    : function(){}
        });
    }])
})(angular);