(function(){
    "use strict";
    angular.module('halo')
        .factory('collectService', ["$q", "$rootScope", "$window", "$location","$resource","$http", function($q, $rootScope, $window, $location,$resource,$http){
            function getInfo(data){
                var deferred = $q.defer();
                var resource = $resource('/uc/collects');
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
                return deferred.promise;
            }
            function getInfoVia$http(data){
                var deferred = $q.defer();
                //console.log(data);
                $http({
                    method: 'GET',
                    url: '/uc/collect?module=case',
                    headers: {
                        'Authorization': 'Bearer '+ app.index.haloAuth().getToken()
                    },
                    //data: data
                }).then(function(res){
                    res=res.data;
                    if(res.iRet==1){
                        deferred.resolve(res);
                    }else{
                        deferred.reject(res.info);
                    }
                }, function(res){
                    deferred.reject('网络繁忙请稍候再试');
                });

                return deferred.promise;
            }
            return{
                getInfo:getInfo
            };
        }])
    ;
}());