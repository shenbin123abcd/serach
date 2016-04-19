(function(){
    "use strict";
    angular.module('halo')
        .controller('collectCtrl', ['$rootScope','$scope', '$timeout','$stateParams','$q', '$location','collectService',
            function($rootScope,$scope, $timeout,$stateParams,$q, $location,collectService) {
                $scope.vm={};
                var vm=$scope.vm;
                var para={
                    module:'case',
                };
                collectService.getInfo(para).then(function(res){
                    vm.user=res.data;
                });


            }])

}());
