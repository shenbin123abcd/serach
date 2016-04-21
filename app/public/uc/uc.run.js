(function(){
    "use strict";
    angular.module('halo').run(['$rootScope','$state','$timeout','$window','$location','$sce',
    function($rootScope, $state, $timeout,$window,$location,$sce) {
        window.appConfig.debug&&console.log('running in debug mode');
        $rootScope.pageTitle='个人中心 - 开放平台';
        $rootScope.staticUrl=appConfig.staticUrl;
        $rootScope.imgPreload='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURfDw8Lu/XasAAAAKSURBVAjXY2AAAAACAAHiIbwzAAAAAElFTkSuQmCC';
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //console.log(event, toState, toParams, fromState, fromParams);
            //console.log(toState, toParams,$location.url());

            $rootScope.toState=toState;
            $rootScope.fromState=fromState;
            $rootScope.fromParams=fromParams;
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            //console.log(toState, toParams);
            _hmt.push(['_trackPageview', $location.url()]);
        });
        $rootScope.windowWidth=$($window).width();

        $rootScope.device=hb.agent.device();
        $rootScope.browser=hb.agent.browser();


        $rootScope.user=app.index.haloAuth().getUser();
        console.log($rootScope.user)

        $rootScope.go=function(url){
            window.location.href=url;
        };

        //alert(haloBrowser.device());

        $($window).on('orientationchange',function(){
            $rootScope.windowWidth=$($window).width();
        });
        //$sce.trustAsResourceUrl('http://10.0.1.29:9000/app/public/uc/views/uc.view.tabs.html')


    }]);
}());
