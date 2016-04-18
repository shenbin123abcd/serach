/**
 * Created by Administrator on 2016/1/20.
 */
(function(){
    "use strict";
    angular.module('halo').config(['$stateProvider','$urlRouterProvider','$locationProvider','$httpProvider','$sceDelegateProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,$httpProvider,$sceDelegateProvider){

        //console.log('config');
        $urlRouterProvider.otherwise("/");
        //$locationProvider.html5Mode({
        //    enabled: true,
        //    requireBase: false
        //});
        //$locationProvider.hashPrefix('!');
        //$sceDelegateProvider.resourceUrlWhitelist([
        //    'http://10.0.1.29:9000/app/public/uc/setting/aa.html'
        //]);

        $stateProvider
            .state('setting', {
                url: '/',
                templateUrl: appConfig.staticUrl+'/uc/user/uc.view.user.html'+appConfig.bust,
                data: { pageTitle: '个人中心' },
                controller: 'settingCtrl'
            })
        ;
        $httpProvider.interceptors.push('authInterceptor');


    }]);
}());