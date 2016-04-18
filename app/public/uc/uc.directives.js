(function(){
    "use strict";
    angular.module('halo')
    .directive('pageTitle', ['$rootScope', '$timeout',function($rootScope, $timeout) {
        return {
            link: function(scope, element) {
                var listener = function(event, toState, toParams, fromState, fromParams) {
                    $rootScope.$broadcast('PAGE_TITLE', toState);
                    var title = '在线学院';
                    if (toState.data && toState.data.pageTitle) {
                        title = toState.data.pageTitle + ' | 在线学院';
                    }
                    $timeout(function() {
                        element.text(title);
                    });
                };
                $rootScope.$on('$stateChangeStart', listener);
                //$rootScope.PageTitle='';
            }
        }
    }])
    .directive('sideBar', ['$timeout','$sce',function($timeout,$sce){
        var linkFunction=function($scope, $element, $attrs){
            var vm;
            $scope.vm=vm={};
            vm.list=[
                {
                    ico:'person-circle',
                    title:'个人设置',
                },
                {
                    ico:'authentication',
                    title:'申请认证',
                },
                {
                    ico:'star-empty',
                    title:'我的收藏',
                },
                {
                    ico:'dialog',
                    title:'我的评论',
                },
            ];
        };
        return{
            restrict: 'AE',
            templateUrl: $sce.trustAsResourceUrl(appConfig.staticUrl+'/uc/views/uc.view.sidebar.html'+appConfig.bust),
            scope: {},
            link:linkFunction
        }
    }])




    ;
}());
