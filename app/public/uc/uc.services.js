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
    ;
}());
