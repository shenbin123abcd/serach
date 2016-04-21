(function(){
    "use strict";
    angular.module('halo')
        .factory('commentService', ["$q", "$rootScope", "$window", "$location","$resource", function($q, $rootScope, $window, $location,$resource){
            function getInfo(data){
                var deferred = $q.defer();
                var resource = $resource('/uc/comment');
                resource.get(data, function(res){
                    //console.log(data,res);
                    if(res.iRet==1){
                        res.data.data.forEach(function(n,i){
                            n.create_time=n.create_time*1000
                        });
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

            function _delete(data){
                var deferred = $q.defer();
                var resource = $resource('/uc/comment/:id');
                resource.delete({id:data.id}, function(res){
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
            return{
                getInfo:getInfo,
                delete:_delete,
            };
        }])
    ;
}());