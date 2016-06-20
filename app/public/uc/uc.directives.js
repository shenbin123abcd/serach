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
                //{
                //    ico:'authentication',
                //    title:'申请认证',
                //    state:'collect',
                //},
                {
                    ico:'star-empty',
                    title:'我的收藏',
                    state:'collect',
                },
                {
                    ico:'dialog',
                    title:'我的评论',
                    state:'comment',
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
    .directive('sJcrop', ['$timeout','$sce',function($timeout,$sce){
        var linkFunction=function($scope, $element, $attrs){
            var $imgContainer=$element;
            var $img=$element.find('img');
            var jcrop_api;
            $scope.$watch('sJcropSrc',function(val){
                //console.log(val);
                if(val){
                    var imgHeight=$scope.sJcropH;
                    var imgWidth=$scope.sJcropW;
                    var cor=$scope.sJcropCor;
                    if(jcrop_api){
                        jcrop_api.destroy();
                    }
                    //console.log($scope)
                    switch(true){
                        case imgWidth/imgHeight==1:
                            var imgContainerOpt={
                                width: 400,
                                height: 400,
                                left: 0,
                                top: 0,
                            };
                            cor = {
                                'x': imgWidth*0.1,
                                'y': imgWidth*0.1,
                                'x2': imgWidth*0.9,
                                'y2': imgWidth*0.9,
                            };
                            break;
                        case imgWidth/imgHeight>1:
                            var imgContainerOpt={
                                width: 400,
                                height: imgHeight/(imgWidth/400),
                                left: 0,
                                top: 200-imgHeight/(imgWidth/400)/2,
                            };

                            cor = {
                                'x': (imgWidth-imgHeight)/2,
                                'y': 0,
                                'x2': (imgWidth-imgHeight)/2+imgHeight,
                                'y2': imgHeight,
                                'w':imgHeight,
                                'h': imgHeight,
                            };

                            if(imgWidth/imgHeight<1.1){
                                cor.x=cor.w*0.1;
                                cor.y=cor.w*0.1;
                                cor.x2=cor.w*0.9;
                                cor.y2=cor.w*0.9;
                                cor.w=cor.w*0.8;
                                cor.h=cor.w*0.8;
                            }
                            break;
                        case imgWidth/imgHeight<1:

                            var imgContainerOpt={
                                height: 400,
                                width: imgWidth/(imgHeight/400),
                                top: 0,
                                left: 200-imgWidth/(imgHeight/400)/2,
                            };
                            cor = {
                                'x': 0,
                                'y': (imgHeight-imgWidth)/2,
                                'x2': imgWidth,
                                'y2': (imgHeight-imgWidth)/2+imgWidth,
                                'w':imgWidth,
                                'h': imgWidth,
                            };
                            if(imgWidth/imgHeight>0.9){
                                cor.x=cor.h*0.1;
                                cor.y=cor.h*0.1;
                                cor.x2=cor.h*0.9;
                                cor.y2=cor.h*0.9;
                                cor.w=cor.h*0.8;
                                cor.h=cor.h*0.8;
                            }
                            break;
                    }





                    $imgContainer.css(imgContainerOpt);
                    $img.css(imgContainerOpt);
                    //$("#target >img").attr("src",ret.url);





                    var opt={
                        trueSize: [imgWidth,imgHeight] ,
                        aspectRatio:1,
                        bgColor: 'black',
                        bgOpacity: 0.4,
                        onChange: showCoords,
                        onSelect: showCoords,
                        setSelect: [cor.x, cor.y, cor.x2, cor.y2],
                    };
                    //console.log(opt)
                    $img.Jcrop(opt,function(){
                        jcrop_api = this;
                    });

                    //var jcrop_cor={};

                }else{

                }
                function showCoords(c) {
                    cor=c;
                    //console.log(c)
                }

            })






        };
        return{
            restrict: 'AE',
            scope: {
                sJcropSrc:'=',
                sJcropH:'=',
                sJcropW:'=',
                sJcropCor:'=',
            },
            replace:false,
            template: `
             <img ng-src="{{sJcropSrc}}">
            `,
            link:linkFunction
        }
    }])



    ;
}());
