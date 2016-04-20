(function(){
    "use strict";
    angular.module('halo')
        .controller('collectCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','collectService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,collectService) {
                $scope.vm={};
                var vm=$scope.vm;

                function init(){
                    vm.getList('case');
                }


                vm.getList= function(module){
                    var para={
                        module:module,
                    };
                    collectService.getInfo(para).then(function(res){
                        switch (module){
                            case 'case':
                                vm.caseList=res.data.data;
                                break;
                            case 'picture':
                                vm.pictureList=res.data;
                                break;
                            case 'zhuanti':
                                vm.topicList=res.data;
                                break;
                        }
                    });
                };

                init()
            }])
}());
