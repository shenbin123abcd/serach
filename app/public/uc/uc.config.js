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
                abstract: true,
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
                abstract: true,
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

        ;
        $httpProvider.interceptors.push('authInterceptor');


    }]);
}());