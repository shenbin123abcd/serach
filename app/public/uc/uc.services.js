(function(){
    "use strict";
    angular.module('halo')
    .factory('authInterceptor', ["$q", "$rootScope", "$window", "$location",
        function($q, $rootScope, $window, $location){
            return {
                'request': function(config){
                    config.headers = config.headers || {};

                    if (typeof config.headers.Authorization == 'undefined' || config.headers.Authorization.length == 0) {//$location.$$path !== '/data/caseAdd'
                        var token = app.index.haloAuth().getToken();


                        if (token) {
                            //console.log(token,config,config.url.indexOf('.html')>-1);
                            if(config.url.indexOf('.html')>-1){

                            }else{
                                config.headers.Authorization = 'Bearer ' + token;
                            }
                        }
                    }
                    return config;
                },
                'responseError': function(response){
                    if (response.status == 500 || response.status == 504) {
                        $rootScope.$broadcast('network-timeout');
                    } else if (response.status == 404) {
                        $rootScope.$broadcast('not-found');
                    }
                    return $q.reject(response);
                }
            };
        }])
        .factory('companyService', ["$q", "$rootScope", "$window", "$location","$resource", function($q, $rootScope, $window, $location,$resource){
            function getInfo(data){
                var deferred = $q.defer();
                var resource = $resource('/api/company');
                switch (true){
                    case hb.validation.isEmpty(data.keywords):
                        deferred.reject('请输入搜索关键字');
                        break;
                    case data.keywords.length<2:
                        deferred.reject('请输入至少两个字符');
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
