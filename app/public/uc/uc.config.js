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


        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            appConfig.staticUrl+'**',
        ]);

        $stateProvider
            .state('user', {
                url: '/',
                templateUrl: appConfig.staticUrl+'/uc/user/uc.view.user.html'+appConfig.bust,
                data: { pageTitle: '个人中心' },
                controller: 'userCtrl'
            })
            .state('collect', {
                url: '/collect',
                templateUrl: appConfig.staticUrl+'/uc/collect/uc.view.collect.html'+appConfig.bust,
                data: { pageTitle: '我的收藏' },
                controller: 'collectCtrl'
            })
            .state('comment', {
                url: '/comment',
                templateUrl: appConfig.staticUrl+'/uc/comment/uc.view.comment.html'+appConfig.bust,
                data: { pageTitle: '我的评论' },
                controller: 'commentCtrl'
            })

        ;
        $httpProvider.interceptors.push('authInterceptor');


    }]);
}());