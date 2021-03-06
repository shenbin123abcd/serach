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
            'http://7kttnj.com2.z0.glb.qiniucdn.com/**',
        ]);

        $stateProvider
            .state('user', {
                url: '/',
                templateUrl: appConfig.staticUrl+'/uc/user/uc.view.user.html'+appConfig.bust,
                data: { pageTitle: '个人中心' },
                controller: 'userCtrl'
            })


            .state('collect', {
                //abstract: true,
                redirectTo: 'collect.case',
                url: '/collect',
                templateUrl: appConfig.staticUrl+'/uc/collect/uc.view.collect.html'+appConfig.bust,
                data: { pageTitle: '我的收藏' },
                controller: 'collectCtrl'
            })
            .state('collect.case', {
                url: '/case',
                templateUrl: appConfig.staticUrl+'/uc/collect/uc.view.collect.case.html'+appConfig.bust,
                data: { pageTitle: '我的收藏 - 案例' },
                controller: 'collectCaseCtrl'
            })
            .state('collect.picture', {
                url: '/picture',
                templateUrl: appConfig.staticUrl+'/uc/collect/uc.view.collect.picture.html'+appConfig.bust,
                data: { pageTitle: '我的收藏 - 案例' },
                controller: 'collectPictureCtrl'
            })
            .state('collect.topic', {
                url: '/topic',
                templateUrl: appConfig.staticUrl+'/uc/collect/uc.view.collect.topic.html'+appConfig.bust,
                data: { pageTitle: '我的收藏 - 案例' },
                controller: 'collectTopicCtrl'
            })

            .state('comment', {
                //abstract: true,
                redirectTo: 'comment.user',
                url: '/comment',
                templateUrl: appConfig.staticUrl+'/uc/comment/uc.view.comment.html'+appConfig.bust,
                data: { pageTitle: '我的评论' },
                controller: 'commentCtrl'
            })
            .state('comment.user', {
                url: '/user',
                templateUrl: appConfig.staticUrl+'/uc/comment/uc.view.comment.user.html'+appConfig.bust,
                data: { pageTitle: '我的评论' },
                controller: 'commentUserCtrl'
            })
            .state('comment.company', {
                url: '/company',
                templateUrl: appConfig.staticUrl+'/uc/comment/uc.view.comment.company.html'+appConfig.bust,
                data: { pageTitle: '对我的评论' },
                controller: 'commentCompanyCtrl'
            })

            .state('auth', {
                abstract: true,
                url: '/auth',
                templateUrl: appConfig.staticUrl+'/uc/auth/uc.view.auth.html'+appConfig.bust,
                data: { pageTitle: '我的收藏' },
                controller: 'authCtrl'
            })
            .state('auth.search', {
                url: '/search',
                templateUrl: appConfig.staticUrl+'/uc/auth/uc.view.auth.search.html'+appConfig.bust,
                data: { pageTitle: '我的公司' },
                controller: 'authSearchCtrl'
            })
            .state('auth.apply', {
                url: '/apply/:id',
                templateUrl: appConfig.staticUrl+'/uc/auth/uc.view.auth.apply.html'+appConfig.bust,
                data: { pageTitle: '我的公司' },
                controller: 'authApplyCtrl'
            })

        ;
        $httpProvider.interceptors.push('authInterceptor');


    }]);
}());