(function(){
    "use strict";
    angular.module('halo')
        .factory('authService', ["$q", "$rootScope", "$window", "$location","$resource", function($q, $rootScope, $window, $location,$resource){
            function getInfo(data){

                var deferred = $q.defer();
                var resource = $resource('/api/company');
                switch (true){
                    case hb.validation.isEmpty(data.keywords):
                        deferred.reject('请输入搜索关键字');
                        break;
                    default:
                        sendXhr();
                }
                function sendXhr(){
                    resource.get(data, function(res){
                        //console.log(data,res);
                        if(res.iRet==1){
                            deferred.resolve(res);
                        }else{
                            deferred.reject(res.info);
                        }
                    }, function(error){
                        //console.log(res);
                        deferred.reject('网络繁忙请稍候再试');
                    });
                }

                return deferred.promise;
            }


            return{
                getInfo:getInfo
            };
        }])
    ;
}());