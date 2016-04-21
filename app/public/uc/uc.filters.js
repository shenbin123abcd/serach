
(function(){
    "use strict";
    angular.module('halo')
        .filter('sid2rank', function() {
            return function (input) {
                return input ? '企业用户' : '普通用户';
            }
        })
    ;
}());



