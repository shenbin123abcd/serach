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
    .directive('collegeHeader', ['$timeout','userModal','haloAuth','$state','$stateParams','haloUtil','haloBrowser',function($timeout,userModal,haloAuth,$state,$stateParams,haloUtil,haloBrowser){
        var linkFunction=function($scope, $element, $attrs){
            var vm;
            $scope.vm=vm={};
            if(haloBrowser.device()=='iPhone'||haloBrowser.device()=='iPad'){
                $element.on('focus','input[type="search"]',function(){
                    var winScrollTop=$(window).scrollTop();
                    //console.log(winScrollTop);
                    $element.addClass("iosfixfixed");
                    //$(window).scrollTop(winScrollTop);
                    //$element.find('.header').css({
                    //    top:winScrollTop
                    //});
                    //alert(winScrollTop);
                    //alert($(window).height());
                });

                $element.on('blur','input[type="search"]',function(){
                    $element.removeClass("iosfixfixed");
                    //$element.find('.header').css({
                    //    top:''
                    //});
                });
            }
            var token=haloAuth.getToken();
            vm.showSearch=false;
            vm.keyword=$stateParams.keyword;
            if(token){
                vm.userName=haloAuth.getUser().username;
            }


            vm.openUserModal=function(){
                $scope.$emit("userModal opened");
                //$(document).on('touchmove',function(e){
                //    e.preventDefault();
                //});
                //$('body').on('touchstart', '.modal-dialog', function(e) {
                //    if (e.currentTarget.scrollTop === 0) {
                //        e.currentTarget.scrollTop = 1;
                //    } else if (e.currentTarget.scrollHeight === e.currentTarget.scrollTop + e.currentTarget.offsetHeight) {
                //        e.currentTarget.scrollTop -= 1;
                //    }
                //});
                //$('body').on('touchmove', '.modal-dialog', function(e) {
                //    if($(this)[0].scrollHeight > $(this).innerHeight()) {
                //        e.stopPropagation();
                //    }
                //});

                var WindowScrollTop=$(window).scrollTop();

                //$('.page-wrapper').hide();

                //300于csstrs保持一致
                $timeout(function(){
                    $(window).scrollTop(0);
                    $('.page-wrapper').hide();
                },300);


                //$(window).scrollTop(0);
                userModal.open().result.then(function(res){
                    $scope.$emit(res);
                    $scope.$emit("userModal closed");
                    $('.page-wrapper').show();
                    $(window).scrollTop(WindowScrollTop);

                },function(res){
                    $scope.$emit("userModal closed");
                    $('.page-wrapper').show();
                    $(window).scrollTop(WindowScrollTop);
                });
            };
            vm.goSearch=function(keyword){
                if(!keyword){
                    haloUtil.alert({
                        title: '提示',
                        content: '请输入关键字'
                    });
                }else{
                    $state.go('lectureList',{alias:'ss',keyword:keyword});
                }
            };


        };
        return{
            restrict: 'AE',
            templateUrl: "Public/College/views/common/header.html"+appConfig.bust,
            transclude: true,
            scope: {
                headerTitle: '@',
                headerLeft: '=',
                headerRight: '='
            },
            link:linkFunction
        }
    }])
    .directive('collegeFooter', ['$timeout','userModal',function($timeout,userModal){
        return{
            restrict: 'AE',
            templateUrl: "Public/College/views/common/footer.html"+appConfig.bust
        }
    }])
    .directive('userModalHeader', ['$timeout','userModal',function($timeout,userModal){
        var linkFunction=function($scope, $element, $attrs){
            $scope.userModal=userModal;
        };
        return{
            restrict: 'AE',
            templateUrl: "Public/College/views/common/modalHeader.html"+appConfig.bust,
            transclude: true,
            scope: {
                headerTitle: '@',
                closeFun: '&'
            },
            link:linkFunction
        }
    }])
    .directive('haloVideo', ['$timeout',function($timeout){
        var linkFunction=function($scope, $element, $attrs){
            var videoPlayer;
            $scope.$watch('creationDate',function(val){
                if(val){
                    $timeout(function(){
                        //console.log($scope.creationDate);
                        //console.log($element.get()[0]);
                        videoPlayer=videojs($element.get()[0], {
                            fluid: true,
                            //html5: {
                            //    nativeControlsForTouch: false
                            //},
                            "language":"zh-CN"
                        }, function() {


                        });
                    },0)
                }else{
                    //if(videoPlayer){
                    //    videoPlayer.dispose();
                    //}
                }
            });
        };
        return{
            restrict: 'AE',
            scope: {
                creationDate: '='
            },
            link:linkFunction
        }
    }])
    .directive('back', ['$window','$rootScope','$state', function($window,$rootScope,$state) {
        return {
            restrict: 'AE',
            link: function ($scope, $element, $attrs) {
                //console.log($rootScope.fromState,$rootScope.fromState.name);
                $element.on('click', function () {
                    //console.log('click',$rootScope.fromState.name);
                    if($rootScope.fromState.name){
                        //$state.go($rootScope.fromState.name,$rootScope.fromParams);
                        $window.history.back();
                    }else{
                        $state.go('home');
                    }


                });
            }
        };
    }])
    .directive('haloSwiper', ['$timeout',function($timeout){
        var linkFunction=function($scope, $element, $attrs){
            $element.css({"visibility":"hidden"});
            var loading='<div class="home-swiper-loading"><i class="fa fa-spinner fa-spin"></i></div>';
            var $loading=$(loading);
            $element.before( $loading );

            //var $tmp=$element.clone();

            $scope.$on('userModal opened from home',function(){
                //console.log('userModal opened');
                $scope.isHide=true;
            });
            $scope.$on('userModal closed from home',function(){
                //console.log('userModal opened');
                $scope.isHide=false;
            });

            $scope.$watch('creationDate',function(val) {
                if (val) {
                    $timeout(function (swiper) {
                        var swiper = new Swiper($element, {
                            autoplay: 3000,
                            speed: 500,
                            parallax: true,
                            loop: true,
                            onInit:function(sw){
                                sw.slideTo(8,0,$element.css({visibility:''}));
                                sw.startAutoplay();
                                $loading.remove();
                                $scope.$watch('isHide',function(val) {
                                    if(val){
                                        $element.fadeOut();
                                        sw.stopAutoplay();
                                    }else{
                                        $element.show();
                                        sw.startAutoplay();
                                    }
                                },0)
                            },
                            onTransitionEnd:function(){
                                $element.find(".swiper-slide-active").addClass('show-control');
                            },
                            onTransitionStart:function(){
                                $element.find(".show-control").removeClass('show-control');
                            }
                        });
                    }, 0);
                }
            });
        };
        return{
            restrict: 'AE',
            templateUrl: "Public/College/views/common/homeSwiper.html"+appConfig.bust,
            scope: {
                creationDate: '='
            },
            link:linkFunction
        }
    }])
    .directive('imgLazyload', ['$timeout',function($timeout){
        var linkFunction=function($scope, $element, $attrs){
            //console.log($scope.creationDate);
            $scope.$watch('creationDate',function(val) {
                //console.log(val);
                if (val) {
                    $timeout(function () {
                        $element.lazyload({
                            threshold: 200,
                            //event : "click",
                            effect: "fadeIn"
                        });
                    }, 0);
                }
            });
        };
        return{
            restrict: 'AE',
            scope: {
                creationDate: '='
            },
            link:linkFunction
        }
    }])
    .directive('haloFocus', ['$timeout',function($timeout){
        var linkFunction=function($scope, $element, $attrs){

            $scope.$watch('haloFocus',function(val) {

                if (val) {
                    //$timeout(function () {
                    //    //console.log(val,$element);
                    //    $element.focus();
                    //}, 0);
                }else {
                    //$timeout(function () {
                    //    //console.log(val);
                    //    $element.blur();
                    //}, 0);
                }
            });
        };
        return{
            restrict: 'AE',
            scope: {
                haloFocus:"="
            },
            link:linkFunction
        }
    }])
    .directive('haloPlaceholder', ['$timeout',function($timeout){
        var linkFunction=function($scope, $element, $attrs){

            var oTxt;
            $element.on('focus',function(){
                oTxt=$attrs.placeholder;
                $element.attr('placeholder','');

            });
            $element.on('blur',function(){
                $element.attr('placeholder',oTxt);

            });
        };
        return{
            restrict: 'AE',
            scope: {

            },
            link:linkFunction
        }
    }])
    .directive('haloAd', ['$timeout',function($timeout){
        var linkFunction=function($scope, $element, $attrs){
            $scope.hideAd=false;
            $element.find('img').on('load',function(){
                var height=$element.height();

            });

            //$element.find('#close-ad').on('touchstart',function(event){
            //    event.preventDefault();
            //    $element.remove();
            //});
        };
        return{
            restrict: 'AE',
            replace:true,
            template:'<a class="halo-ad" ng-if="!hideAd" href="http://mp.weixin.qq.com/s?__biz=MzAwNjAwNjU0Ng==&mid=407575490&idx=1&sn=74d6dbe60dca46fb3680d96eecdd4f1f&scene=2&srcid=0310lLP9n0aasmogM9ql5aE6#wechat_redirect"><img class="halo-ad__img" src="Public/College/images/ad-1.png"><span  ng-click="$parent.hideAd=true;$event.preventDefault();" class="close-ad" id="close-ad"><i class="haloIcon haloIcon-times"></i></span></a>',
            scope: {

            },
            link:linkFunction
        }
    }])
    ;
}());
