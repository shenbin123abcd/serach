(function(){
    "use strict";
    angular.module('halo')
        .controller('collectCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','collectService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,collectService) {
                $scope.vm={};
                var vm=$scope.vm;
                var listType='';
                function init(){

                }

                vm.getList= function(module){
                    if(listType==module){
                        return
                    }
                    vm.data=undefined;
                    var para={
                        module:module,
                    };
                    collectService.getInfo(para).then(function(res){
                        switch (module){
                            case 'case':
                                vm.data=res.data;
                                listType=module;
                                break;
                            case 'picture':
                                vm.data=res.data;
                                listType=module;
                                break;
                            case 'zhuanti':
                                vm.data=res.data;
                                listType=module;
                                break;
                        }
                    });
                };

                init()
            }])
        .controller('collectCaseCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','commentService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,commentService) {
                $scope.vm.getList('case');
            }])
        .controller('collectPictureCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','commentService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,commentService) {
                $scope.vm.getList('picture');
            }])
        .controller('collectTopicCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','commentService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,commentService) {
                $scope.vm.getList('zhuanti');
            }])
}());
