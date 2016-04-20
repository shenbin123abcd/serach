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
                    state:'user',
                },
                {
                    ico:'authentication',
                    title:'申请认证',
                    state:'collect',
                },
                {
                    ico:'star-empty',
                    title:'我的收藏',
                    state:'collect',
                },
                {
                    ico:'dialog',
                    title:'我的评论',
                    state:'collect',
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
    .directive('ucUibPagination', ['$timeout','$sce',function($timeout,$sce){
        var compileFunction=function( $element, $attrs){
            //console.log('few',$element.children());
            $element.children().attr("template-url", appConfig.staticUrl+"/uc/views/uc.view.pagination.html"+appConfig.bust);
        };
        return{
            restrict: 'AE',
            scope: {},
            compile:compileFunction
        }
    }])
    .directive('ucUibPaginationControl', ['$timeout','$sce',function($timeout,$sce){
        var linkFunction=function($scope, $element, $attrs){

        };
        return{
            restrict: 'AE',
            scope: {
                targetPage:'@',
                currentPage:'=',
                totalPage:'@',
            },
            replace:true,
            template: `
             <form class="s-pagination__control form-inline" ng-submit="currentPage=targetPage">


                <div class="form-group">
                    <div class="form-control-static">共{{totalPage}}页 到第</div>
                  </div>
                   <div class="form-group">
                <input class="form-control"  type="text" ng-model="targetPage"  >
                </div>
               <div class="form-group">
                    <div class="form-control-static">页</div>
                  </div>
                <button class="btn btn-default"   type="submit" >确定</button>
            </form>

            `,
            link:linkFunction
        }
    }])



    ;
}());
