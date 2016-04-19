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
                                vm.caseData=res.data;
                                break;
                            case 'picture':
                                vm.pictureData=res.data;
                                break;
                            case 'zhuanti':
                                vm.topicData=res.data;
                                break;
                        }
                    });
                };

                init()
            }])
}());
